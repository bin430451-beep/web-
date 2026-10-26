import express from 'express'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import contactRouter from './routes/contact.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(process.env.PORT) || 3000

// JSON 请求体（限制大小，防滥用）
app.use(express.json({ limit: '64kb' }))

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

app.listen(PORT, () => {
  console.log(`[server] 服务已启动：http://localhost:${PORT}`)
  console.log(`[server] API 接口：/api/health  /api/contact`)
  if (!existsSync(distDir)) {
    console.log('[server] 提示：未找到 dist/ 前端产物，请先执行 npm run build')
  }
})
