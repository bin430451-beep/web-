import { Router } from 'express'
import { requireAdminToken } from '../middleware/requireAdminToken.js'
import { createContactMessage, getContactMessages } from '../services/contactService.js'

const router = Router()

router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

/**
 * POST /api/contact
 * 提交商务咨询（服务端二次校验后入库）
 */
router.post('/', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  const result = createContactMessage(req.body, ip)
  if (result.error) return res.status(result.status).json({ error: result.error })
  return res.status(result.status).json({ ok: true })
})

/**
 * GET /api/contact?limit=N
 * 查询咨询记录（后台查看用，默认 50 条）
 */
router.get('/', requireAdminToken, (req, res) => {
  res.json({ items: getContactMessages(req.query.limit) })
})

export default router
