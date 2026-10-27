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
| `/#/contact` | 联系我们（正式站写入数据库；GitHub Pages 体验站仅模拟提交） |

## 项目结构与常见修改

| 目录 / 文件 | 放什么 | 常见操作 |
| --- | --- | --- |
| `src/views/` | 每个路由对应的整页 | 修改页面布局和页面专属交互 |
| `src/components/` | 可重复使用的 UI 组件 | 调整导航、页脚、区块标题或页面头部 |
| `src/composables/` | Vue 页面可复用的状态与操作逻辑 | 修改表单校验、加载状态或重置行为 |
| `src/services/` | 前端 API 请求 | 修改联系表单调用的接口或请求格式 |
| `src/config/site.js` | 品牌、联系方式、平台、统计数据 | 替换站点品牌信息 |
| `src/config/content.js` | 服务、案例、流程、里程碑、价值观 | 更新展示文案和案例数据 |
| `server/routes/` | 后端 HTTP 接口 | 增删或调整 API 路由 |
| `server/middleware/` | 可复用的请求前置检查 | 修改管理令牌校验等访问控制 |
| `server/services/` | 后端校验和业务流程 | 修改咨询字段校验、限流和记录查询规则 |
| `server/db.js` | SQLite 表结构和数据操作 | 调整咨询记录字段或数据库查询 |

常见任务：

- **改品牌和联系方式：** 编辑 `src/config/site.js`。
- **改服务和案例：** 编辑 `src/config/content.js`。
- **改页面样式：** 编辑对应的 `src/views/*View.vue`；多页共用的页头改 `src/components/PageHero.vue`。
- **改联系表单：** 页面结构在 `src/views/ContactView.vue`，表单状态与校验在 `src/composables/useContactForm.js`，网络请求和 Pages 演示逻辑在 `src/services/contactApi.js`。
- **增加页面：** 新建 `src/views/YourView.vue`，在 `src/router/index.js` 注册路由，再在 `src/components/AppNav.vue` 和 `src/components/AppFooter.vue` 添加导航入口。
- **增加咨询字段：** 同步更新表单页面、`useContactForm.js`、`contactApi.js`、`server/services/contactService.js` 和 `server/db.js`，确保前后端字段名称一致。

组件拆分原则：页面文件负责组合布局；通用界面放 `components`；可复用状态放 `composables`；HTTP 请求放 `services`。这样查找修改点时可以从页面一路定位到数据和接口。

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

部署分为 GitHub Pages 静态体验版和正式 Node.js 网站。Pages 只能预览前端，不能运行 Express/SQLite；需要真实接收咨询时，请使用带持久化磁盘的 Node.js 服务或 Docker。

所有部署操作、GitHub 设置、环境变量、更新与故障排查步骤见[完整部署手册](DEPLOYMENT.md)。

## GitHub Actions

push 到 `main` 会运行 `Build Check` 构建校验，并运行 `Deploy GitHub Pages Demo` 更新静态体验站。Node 后端无法运行在 GitHub Pages 上，正式部署请按[完整部署手册](DEPLOYMENT.md)操作。

## 替换占位内容（重要）

所有品牌与联系信息均为**占位内容**，集中维护在两个文件：

| 文件 | 内容 |
| --- | --- |
| `src/config/site.js` | 品牌名、slogan、简介、平台、联系方式、核心数据 |
| `src/config/content.js` | 服务、案例、流程、里程碑、价值观文案 |

替换后全站（导航、页脚、各页面、SEO title）同步生效。
页面入口标题与 Open Graph 标签在 `index.html` 中，可一并修改。
