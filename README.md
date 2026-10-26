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
| GET | `/api/contact?limit=50` | 查询咨询记录（倒序，最多 200 条） |

服务端二次校验 + 参数化查询（防注入）+ 每 IP 每小时限 10 条（防刷）。

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

数据库文件由服务首次启动时自动创建，不提交到 Git。

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

部署后访问 `http://服务器地址:3000`，健康检查地址为 `/api/health`。SQLite 数据保存在 `media-site-data` 卷中，容器更新或重建时不会丢失。更新镜像时重新执行构建，然后删除旧容器并用相同数据卷启动新容器。

### 方式三：云平台（Railway / Render / 腾讯云等）

选择 Node.js 20 运行时，启动命令 `npm start`，构建命令 `npm install && npm run build`。请为实例配置持久化磁盘，并将 `DB_PATH` 指向该磁盘上的数据库文件；临时文件系统重启或重新部署时可能被清空。

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
