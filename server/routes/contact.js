import { Router } from 'express'
import { createHash, timingSafeEqual } from 'node:crypto'
import { listMessages, submitMessage } from '../db.js'

const router = Router()

const PHONE_RE = /^1\d{10}$/

router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

function requireAdminToken(req, res, next) {
  const expected = process.env.CONTACT_ADMIN_TOKEN
  if (!expected || expected.length < 32) {
    return res.status(503).json({ error: '记录查询功能未配置访问凭据' })
  }

  const match = /^Bearer\s+(.+)$/i.exec(req.get('authorization') || '')
  if (!match) return res.status(401).json({ error: '未授权' })

  const suppliedHash = createHash('sha256').update(match[1]).digest()
  const expectedHash = createHash('sha256').update(expected).digest()
  if (!timingSafeEqual(suppliedHash, expectedHash)) {
    return res.status(401).json({ error: '未授权' })
  }
  return next()
}

/**
 * POST /api/contact
 * 提交商务咨询（服务端二次校验后入库）
 */
router.post('/', (req, res) => {
  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: '请求内容格式不正确' })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > 50) {
    return res.status(400).json({ error: '请填写称呼，且不超过 50 个字符' })
  }
  if (!PHONE_RE.test(phone)) {
    return res.status(400).json({ error: '请填写正确的 11 位手机号' })
  }
  if (!message || message.length > 2000) {
    return res.status(400).json({ error: '请描述您的需求，且不超过 2000 个字符' })
  }
  if (company.length > 100) {
    return res.status(400).json({ error: '公司或品牌名称不能超过 100 个字符' })
  }
  if (service.length > 50) {
    return res.status(400).json({ error: '服务名称不能超过 50 个字符' })
  }

  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  const accepted = submitMessage({
    name,
    phone,
    company,
    service,
    message,
    ip
  })
  if (!accepted) {
    return res.status(429).json({ error: '提交过于频繁，请稍后再试' })
  }

  res.status(201).json({ ok: true })
})

/**
 * GET /api/contact?limit=N
 * 查询咨询记录（后台查看用，默认 50 条）
 */
router.get('/', requireAdminToken, (req, res) => {
  const requestedLimit = Number(req.query.limit)
  const limit = Number.isSafeInteger(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, 200)
    : 50
  res.json({ items: listMessages(limit) })
})

export default router
