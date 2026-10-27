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

### GitHub Pages 体验版（用于预览和试用）

仓库已经配置 GitHub Actions 自动发布静态体验版。它可以在 GitHub Pages 上预览页面、导航、案例筛选和表单交互；由于 Pages 不运行 Express/SQLite，表单只会模拟提交，不会发送或保存填写内容。需要真正收集咨询时，请使用下面的 Node.js 正式部署方式。

首次启用时，在 GitHub 仓库中操作一次：

1. 打开仓库 `Settings`（设置）。
2. 左侧选择 `Pages`。
3. 在 `Build and deployment`（构建与部署）区域，将 `Source`（来源）改为 `GitHub Actions`。
4. 回到 `Actions` 页面，打开 `Deploy GitHub Pages Demo` 工作流；如果它没有自动运行，点 `Run workflow`。
5. 等待 `build` 和 `deploy` 两项都显示绿色成功标记，再回到 `Settings → Pages` 打开网站地址。通常地址为 `https://bin430451-beep.github.io/web-/`。

之后每次推送到 `main`，体验版都会自动更新。GitHub Actions 中的 `Build Check` 只检查项目能否构建；`Deploy GitHub Pages Demo` 才负责发布体验版。

### 推荐：使用带持久化磁盘的云平台

这是发布正式网站的推荐方式。选择支持 **Node.js 后端、持久化磁盘和 HTTPS** 的 Web Service（例如 Railway、Render 或同类平台）。请勿把 GitHub Pages 或普通“静态网站 / Static Site”当作正式站：它们不能运行本项目的 Express 服务和 SQLite 数据库，咨询表单也就无法真正入库。

#### 第一步：把 GitHub 仓库导入云平台

1. 登录云平台，选择新建 **Web Service / Node.js 应用**。
2. 连接 GitHub 账号并选择 `bin430451-beep/web-` 仓库。
3. 如果平台询问代码分支，选择 `main`。

#### 第二步：填写构建和启动命令

在平台的部署设置中填写以下值（不同平台的字段名称可能略有不同）：

| 设置项 | 填写内容 |
| --- | --- |
| 运行环境 | [Node.js 24 LTS](https://nodejs.org/en/about/previous-releases) |
| 构建命令 | `npm install --no-audit --no-fund && npm run build` |
| 启动命令 | `npm start` |
| 实例数量 | 1 |

#### 第三步：添加持久化磁盘

在平台的 **Disks / Storage / 持久化磁盘** 页面添加磁盘，并记下平台给出的挂载目录。例如挂载目录是 `/var/data`，就把下面的 `DB_PATH` 设置成 `/var/data/messages.db`。请使用你自己的挂载目录；不要照抄示例路径。

SQLite 数据库必须放在持久化磁盘里。否则平台重新部署或重启后，咨询记录可能丢失。请使用单个应用实例；多机部署需要更换为共享数据库，并配置共享限流存储。

#### 第四步：填写环境变量

在平台的 **Environment Variables / 环境变量 / Secrets / 密钥** 页面添加：

| 名称 | 示例值 | 是否必需 |
| --- | --- | --- |
| `DB_PATH` | `/var/data/messages.db` | 必需，改为你的持久化磁盘路径 |
| `CONTACT_ADMIN_TOKEN` | 64 个十六进制字符 | 可选；需要查询咨询记录时才设置 |
| `TRUST_PROXY` | `1` | 按平台说明填写可信代理层数；不确定时先询问平台 |

平台通常会自动设置 `PORT`，一般不需要手动添加。管理令牌可以在已安装 Node.js 的电脑上生成：

```bash
node -p "require('node:crypto').randomBytes(32).toString('hex')"
```

把生成的字符串作为 `CONTACT_ADMIN_TOKEN` 的值，保存到平台密钥设置中。不要把真实令牌写进代码或提交到 GitHub。没有配置该令牌时，网站表单照常提交，但 `GET /api/contact` 查询接口会关闭。

`TRUST_PROXY` 只填写平台文档明确提供的代理层数，不要填 `true`。填错可能让访客共用同一个限流计数，或绕过按 IP 限流。

#### 第五步：部署并确认启动

1. 点击 **Deploy / 部署**，等待平台完成构建和启动。
2. 打开平台分配的 HTTPS 网站地址，确认首页能显示。
3. 在网址后加 `/api/health`，例如 `https://你的域名/api/health`。看到 `{"ok":true,...}` 表示服务端已启动。
4. 检查平台日志没有启动错误，并确认磁盘状态为已挂载。

不要在没有 HTTPS 的公开网址上填写真实咨询信息。域名和 HTTPS 证书通常可在云平台的 **Domains / Custom Domains** 页面配置。

### 备用：使用 Docker 部署到自己的服务器

适合已经有安装 Docker 的 Linux 服务器和 HTTPS 反向代理的情况。下面命令在服务器终端中逐条执行；`cd web-` 后应位于含有 `Dockerfile` 的项目目录。

```bash
git clone https://github.com/bin430451-beep/web-.git
cd web-
docker build -t media-site .
docker volume create media-site-data
docker run -d --name media-site --restart unless-stopped -p 127.0.0.1:3000:3000 -e DB_PATH=/app/data/messages.db -v media-site-data:/app/data media-site
```

这会把服务仅绑定到服务器本机的 `127.0.0.1:3000`，然后由 HTTPS 反向代理转发访问。请将域名和 TLS 证书配置在反向代理中，不要直接通过 HTTP 对外提供咨询表单。确认代理层数后，才在启动容器时添加 `-e TRUST_PROXY=准确的跳数`；有咨询记录查询需求时，还可以添加 `-e CONTACT_ADMIN_TOKEN=你的随机令牌`。这些环境变量是密钥，不要把真实值发到公开渠道。

在服务器上运行 `curl http://127.0.0.1:3000/api/health`，看到 `ok:true` 即表示服务已启动。SQLite 数据保存在 Docker 卷 `media-site-data` 中；更新容器时保留这个卷，记录就不会随容器删除而丢失。更新步骤：重新运行 `docker build -t media-site .`，然后停止并删除旧容器，再用上面的 `docker run` 命令启动新容器。

### 常见问题

- **打开网站显示 502 / 无法连接：** 查看云平台部署日志，确认构建成功、启动命令是 `npm start`，并且实例已运行。
- **表单提交失败：** 确认部署的是 Web Service 而不是静态站点；打开 `/api/health` 检查后端是否可用。
- **重启后咨询记录消失：** `DB_PATH` 没有指向持久化磁盘，或 Docker 启动时没有挂载 `media-site-data` 卷。
- **记录查询返回 503：** 设置 `CONTACT_ADMIN_TOKEN`，值至少 32 个字符，然后重新部署。
- **限流似乎把所有访客算在一起：** 应用位于反向代理后时，按平台文档配置正确的 `TRUST_PROXY` 跳数。
- **GitHub Pages 表单看起来提交成功：** 这是体验版的模拟交互，不会发送或保存数据；正式收集咨询请改用上面的 Node.js 云平台或 Docker 部署。
- **GitHub Pages 部署失败并提示 404：** 检查仓库 `Settings → Pages → Build and deployment → Source` 是否设置为 `GitHub Actions`，然后从 `Actions` 页面重新运行 `Deploy GitHub Pages Demo`。

## GitHub Actions

push 到 `main` 会运行 `Build Check` 构建校验，并运行 `Deploy GitHub Pages Demo` 更新静态体验站。Node 后端无法运行在 GitHub Pages 上，正式部署请使用上面的 Node.js 云平台或 Docker 方式。

## 替换占位内容（重要）

所有品牌与联系信息均为**占位内容**，集中维护在两个文件：

| 文件 | 内容 |
| --- | --- |
| `src/config/site.js` | 品牌名、slogan、简介、平台、联系方式、核心数据 |
| `src/config/content.js` | 服务、案例、流程、里程碑、价值观文案 |

替换后全站（导航、页脚、各页面、SEO title）同步生效。
页面入口标题与 Open Graph 标签在 `index.html` 中，可一并修改。
