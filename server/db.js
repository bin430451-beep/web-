import Database from 'better-sqlite3'
import { chmodSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 数据库目录与文件（默认 data/messages.db，可通过环境变量 DB_PATH 覆盖）
const dataDir = join(__dirname, '..', 'data')
mkdirSync(dataDir, { recursive: true })
const dbPath = process.env.DB_PATH || join(dataDir, 'messages.db')
mkdirSync(dirname(dbPath), { recursive: true })

const db = new Database(dbPath)
if (process.platform !== 'win32') chmodSync(dbPath, 0o600)
db.pragma('journal_mode = WAL')

// 咨询记录表
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT DEFAULT '',
    service TEXT DEFAULT '',
    message TEXT NOT NULL,
    ip TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  )
`)

db.exec('CREATE INDEX IF NOT EXISTS idx_messages_ip_created_at ON messages (ip, created_at)')

const countRecentMessages = db.prepare(
  `SELECT COUNT(*) AS count FROM messages
   WHERE ip = @ip AND created_at >= datetime('now', 'localtime', '-1 hour')`
)
const insertMessageStatement = db.prepare(
  `INSERT INTO messages (name, phone, company, service, message, ip)
   VALUES (@name, @phone, @company, @service, @message, @ip)`
)
const insertRateLimitedMessage = db.transaction(({ message, maxPerHour }) => {
  const { count } = countRecentMessages.get({ ip: message.ip })
  if (count >= maxPerHour) return false
  insertMessageStatement.run(message)
  return true
})

/**
 * Atomically enforce the per-IP limit and insert the message.
 */
export function submitMessage({ name, phone, company, service, message, ip }, maxPerHour = 10) {
  return insertRateLimitedMessage.immediate({
    message: { name, phone, company, service, message, ip },
    maxPerHour
  })
}

/**
 * 按时间倒序查询咨询记录
 */
export function listMessages(limit = 50) {
  const stmt = db.prepare(
    'SELECT id, name, phone, company, service, message, created_at FROM messages ORDER BY id DESC LIMIT ?'
  )
  return stmt.all(limit)
}
