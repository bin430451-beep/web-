import { listMessages, submitMessage } from '../db.js'

const PHONE_RE = /^1\d{10}$/

export function createContactMessage(body, ip) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { status: 400, error: '请求内容格式不正确' }
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > 50) {
    return { status: 400, error: '请填写称呼，且不超过 50 个字符' }
  }
  if (!PHONE_RE.test(phone)) {
    return { status: 400, error: '请填写正确的 11 位手机号' }
  }
  if (!message || message.length > 2000) {
    return { status: 400, error: '请描述您的需求，且不超过 2000 个字符' }
  }
  if (company.length > 100) {
    return { status: 400, error: '公司或品牌名称不能超过 100 个字符' }
  }
  if (service.length > 50) {
    return { status: 400, error: '服务名称不能超过 50 个字符' }
  }

  const accepted = submitMessage({ name, phone, company, service, message, ip })
  if (!accepted) return { status: 429, error: '提交过于频繁，请稍后再试' }
  return { status: 201 }
}

export function getContactMessages(rawLimit) {
  const requestedLimit = Number(rawLimit)
  const limit = Number.isSafeInteger(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, 200)
    : 50
  return listMessages(limit)
}
