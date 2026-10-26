import { Router } from 'express'
import { insertMessage, listMessages } from '../db.js'

const router = Router()

const PHONE_RE = /^1\d{10}$/

// 简单内存限流：每个 IP 每小时最多 10 条，防刷表单
const rateMap = new Map()
function rateLimit(ip) {
  const now = Date.now()
  const windowStart = now - 60 * 60 * 1000
  const list = (rateMap.get(ip) || []).filter((t) => t > windowStart)
  if (list.length >= 10) return false
  list.push(now)
  rateMap.set(ip, list)
  return true
}

/**
 * POST /api/contact
 * 提交商务咨询（服务端二次校验后入库）
 */
router.post('/', (req, res) => {
  const { name, phone, company = '', service = '', message } = req.body || {}

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: '请填写称呼' })
  }
  if (!phone || !PHONE_RE.test(String(phone).trim())) {
    return res.status(400).json({ error: '请填写正确的 11 位手机号' })
  }
  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: '请描述您的需求' })
  }

  const ip = req.ip || ''
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: '提交过于频繁，请稍后再试' })
  }

  insertMessage({
    name: String(name).trim().slice(0, 50),
    phone: String(phone).trim(),
    company: String(company).trim().slice(0, 100),
    service: String(service).trim().slice(0, 50),
    message: String(message).trim().slice(0, 2000),
    ip
  })

  res.status(201).json({ ok: true })
})

/**
 * GET /api/contact?limit=N
 * 查询咨询记录（后台查看用，默认 50 条）
 */
router.get('/', (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200)
  res.json({ items: listMessages(limit) })
})

export default router
