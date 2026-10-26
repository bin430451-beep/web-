# 星屿传媒官网（占位品牌）

短视频 / 自媒体公司官网：**Vue 3 + Vite** 前端 + **Express + SQLite** 后端（前后端一体）。

## 技术栈

- 前端：Vue 3.5（Composition API）、Vite 5、vue-router 4、原生 CSS
- 后端：Express 4、better-sqlite3（SQLite，单文件零配置）

## 页面

| 路由 | 页面 |
| --- | --- |
| `/#/` | 首页（Hero 动画、平台标签、品牌滚动条、数据滚动、服务、案例、流程、CTA） |
| `/#/about` | 关于我们（简介、优势、价值观、发展历程） |
| `/#/services` | 服务内容（6 项服务、交付承诺） |
| `/#/cases` | 案例展示（6 个脱敏案例，支持按服务分类筛选） |
| `/#/contact` | 联系我们（联系信息 + 商务咨询表单，提交写入数据库） |

## 后端接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/health` | 健康检查 |
| POST | `/api/contact` | 提交商务咨询（姓名/手机号/公司/服务/需求），入库 |
| GET | `/api/contact?limit=50` | 使用 Bearer 管理令牌查询记录（倒序，最多 200 条；响应不含 IP） |

服务端严格校验字段类型与长度、参数化查询、每 IP 每小时最多 10 条（SQLite 事务原子限流）、安全响应头、JSON 请求体 16 KB 上限。咨询记录查询默认关闭；只有配置强随机管理令牌后才可访问。数据库文件在 Linux/macOS 上以当前用户私有权限创建。

## 本地开发

```bash
npm install          # 安装前后端依赖
npm run dev:server   # 启动后端 API（http://localhost:3000）
npm run dev          # 另开终端启动前端（http://localhost:5173，/api 自动代理）
```

## 生产运行（前后端一体）

```bash
npm run build        # 构建前端产物到 dist/
npm start            # 启动服务：同时托管 dist 静态文件 + API，默认 http://localhost:3000
```

环境变量：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `PORT` | `3000` | 服务端口 |
| `DB_PATH` | `data/messages.db` | 数据库文件路径 |
| `CONTACT_ADMIN_TOKEN` | 未设置 | 至少 32 个字符的高强度随机值；用于 `GET /api/contact`，未设置时该接口关闭 |
| `TRUST_PROXY` | `0` | 反向代理层数。仅在服务器确实位于代理后时设置为准确的可信代理跳数，例如单层代理设为 `1` |

数据库文件由服务首次启动时自动创建，不提交到 Git。
生成管理令牌的示例：`node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`。将值存入部署平台的密钥配置，不要提交到代码仓库。不要把 `TRUST_PROXY` 设为 `true` 或信任任意代理；配置错误会让客户端伪造 IP 并绕过按 IP 限流。

## 部署

### 方式一：云服务器 / VPS

```bash
npm install
npm run build
npm start        # 建议使用 pm2 / systemd 守护
```

### 方式二：Docker

```bash
# 在项目根目录构建镜像并创建持久化数据卷
docker build -t media-site .
docker volume create media-site-data

# 启动（命令可直接用于 PowerShell、CMD 或 Bash）
docker run -d --name media-site --restart unless-stopped -p 3000:3000 -e DB_PATH=/app/data/messages.db -v media-site-data:/app/data media-site
```

生产环境请在 HTTPS 反向代理或云平台 TLS 后提供访问，避免通过明文 HTTP 传输咨询信息。健康检查地址为 `/api/health`。SQLite 数据保存在 `media-site-data` 卷中，容器更新或重建时不会丢失。可通过 Docker 的 `-e CONTACT_ADMIN_TOKEN=...` 和 `-e TRUST_PROXY=1` 注入密钥及代理层数；没有可信反向代理时不要设置 `TRUST_PROXY`。更新镜像时重新执行构建，然后删除旧容器并用相同数据卷启动新容器。

### 方式三：云平台（Railway / Render / 腾讯云等）

选择 Node.js 20 运行时，启动命令 `npm start`，构建命令 `npm install && npm run build`。请为实例配置持久化磁盘，并将 `DB_PATH` 指向该磁盘上的数据库文件；临时文件系统重启或重新部署时可能被清空。通过平台密钥设置 `CONTACT_ADMIN_TOKEN`；只有确认代理层数后才设置 `TRUST_PROXY`。SQLite 部署请使用单个应用实例和持久化本地卷；多机副本需要迁移到支持并发访问的数据库，并配套共享限流存储。

## GitHub Actions

push 到 `main` 自动执行前端构建校验（`npm run build`），通过即代表代码可交付。
（Node 后端无法运行在 GitHub Pages 上，部署请使用上述方式。）

## 替换占位内容（重要）

所有品牌与联系信息均为**占位内容**，集中维护在两个文件：

| 文件 | 内容 |
| --- | --- |
| `src/config/site.js` | 品牌名、slogan、简介、平台、联系方式、核心数据 |
| `src/config/content.js` | 服务、案例、流程、里程碑、价值观文案 |

替换后全站（导航、页脚、各页面、SEO title）同步生效。
页面入口标题与 Open Graph 标签在 `index.html` 中，可一并修改。
