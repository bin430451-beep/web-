import { createHash, timingSafeEqual } from 'node:crypto'

export function requireAdminToken(req, res, next) {
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
