import express from 'express'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import contactRouter from './routes/contact.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(process.env.PORT) || 3000
const trustProxyHops = Number(process.env.TRUST_PROXY)

app.disable('x-powered-by')
if (Number.isSafeInteger(trustProxyHops) && trustProxyHops > 0) {
  // Set only to the number of trusted reverse proxies in front of this server.
  app.set('trust proxy', trustProxyHops)
}

// Baseline browser security headers. HSTS is sent only for HTTPS requests.
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self' data:"
  )
  if (req.secure) res.setHeader('Strict-Transport-Security', 'max-age=15552000')
  next()
})

// Contact submissions are small; reject oversized or malformed bodies early.
app.use(express.json({ limit: '16kb', strict: true }))

// ===== API 路由 =====
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})
app.use('/api/contact', contactRouter)

// ===== 生产模式：托管前端构建产物 dist/ =====
const distDir = join(__dirname, '..', 'dist')
if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('/', (req, res) => res.sendFile(join(distDir, 'index.html')))
}

// 404 兜底
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  if (err?.status === 400 && err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: '请求内容不是有效的 JSON' })
  }
  if (err?.status === 413) {
    return res.status(413).json({ error: '请求内容过大' })
  }
  console.error('[server] 请求处理失败')
  return res.status(500).json({ error: '服务暂时不可用，请稍后再试' })
})

app.listen(PORT, () => {
  console.log(`[server] 服务已启动：http://localhost:${PORT}`)
  console.log(`[server] API 接口：/api/health  /api/contact`)
  if (!existsSync(distDir)) {
    console.log('[server] 提示：未找到 dist/ 前端产物，请先执行 npm run build')
  }
})
