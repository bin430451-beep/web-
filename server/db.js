import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 数据库目录与文件（默认 data/messages.db，可通过环境变量 DB_PATH 覆盖）
const dataDir = join(__dirname, '..', 'data')
mkdirSync(dataDir, { recursive: true })
const dbPath = process.env.DB_PATH || join(dataDir, 'messages.db')

const db = new Database(dbPath)
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

/**
 * 写入一条咨询记录（参数化查询，防注入）
 */
export function insertMessage({ name, phone, company, service, message, ip }) {
  const stmt = db.prepare(
    `INSERT INTO messages (name, phone, company, service, message, ip)
     VALUES (@name, @phone, @company, @service, @message, @ip)`
  )
  return stmt.run({ name, phone, company, service, message, ip })
}

/**
 * 按时间倒序查询咨询记录
 */
export function listMessages(limit = 50) {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY id DESC LIMIT ?')
  return stmt.all(limit)
}
