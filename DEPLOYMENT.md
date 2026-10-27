# 部署手册

本手册按操作顺序说明如何发布本项目。先根据用途选择部署方式：

| 用途 | 选择 | 表单行为 |
| --- | --- | --- |
| 公开预览页面、导航和案例筛选 | GitHub Pages 体验版 | 只模拟提交，不会发送或保存填写内容 |
| 正式网站、实际接收咨询 | Node.js Web Service 或 Docker 服务器 | 由 Express 接收并写入 SQLite |

**GitHub Pages 不能运行 Express 或 SQLite。** 不能把 Pages 当作正式收集咨询的网站。

## 一、发布 GitHub Pages 体验版

### 首次启用 Pages

1. 登录 GitHub，打开仓库：[bin430451-beep/web-](https://github.com/bin430451-beep/web-)
2. 点击仓库上方的 **Settings**。
3. 在左侧菜单找到 **Pages**。
4. 在 **Build and deployment** 区域，将 **Source** 设为 **GitHub Actions**。
5. 保存设置（若页面自动保存，确认选项已显示为 GitHub Actions 即可）。

这项设置只需完成一次。若工作流曾因 Pages 未启用而失败，先完成以上设置，再按下文手动重新运行。

### 发布网站

可以通过以下任一方式启动发布：

- **推送代码自动发布：** 将更新推送到 `main` 分支后，`Deploy GitHub Pages Demo` 工作流会自动运行。
- **手动发布：** 打开仓库 **Actions** → **Deploy GitHub Pages Demo** → **Run workflow**，分支选 `main`，点击绿色的 **Run workflow** 按钮。

在 Actions 中打开最新一次 `Deploy GitHub Pages Demo` 运行记录：

1. 等待 `build` 工作完成。
2. 等待 `deploy` 工作完成。
3. 两项都显示绿色成功标记后，点击工作流页面提供的网站链接，或打开仓库 **Settings → Pages** 查看发布地址。

本仓库通常使用 `https://bin430451-beep.github.io/web-/`。以 **Settings → Pages** 显示的地址为准。

### 确认体验版状态

- 打开网站，检查首页、导航、案例分类筛选等页面交互。
- 联系表单是演示交互；页面会说明数据不会发送或保存。请勿在体验版填写真实个人信息。
- `Build Check` 工作流只负责检查构建，不会发布网站；发布由 `Deploy GitHub Pages Demo` 负责。

## 二、部署正式 Node.js 网站（推荐）

选择支持 Node.js 后端、持久化磁盘和 HTTPS 的 **Web Service**。Railway、Render 或其他同类平台的按钮名称可能略有不同，按平台界面找到对应设置。不要选择 **Static Site / 静态网站**。

### 1. 从 GitHub 创建 Web Service

1. 登录你的云平台并新建 **Web Service / Node.js 应用**。
2. 连接 GitHub 账号，在仓库列表中选择 `bin430451-beep/web-`。
3. 部署分支选择 `main`。
4. 确认服务类型是可运行 Node.js 服务的 Web Service，而不是静态站点。

### 2. 填写运行和构建设置

| 设置 | 填写内容 |
| --- | --- |
| Node.js 版本 | `24`（本项目要求 `>=24 <25`） |
| 构建命令 | `npm install --no-audit --no-fund && npm run build` |
| 启动命令 | `npm start` |
| 实例数量 | `1` |

如果平台单独提供 Node 版本设置，选择 Node 24。若平台自动安装依赖，仍需确保它执行上述构建命令。

### 3. 创建并挂载持久化磁盘

在服务的 **Disks / Storage / 持久化存储** 设置里创建磁盘，并挂载到一个目录。记录平台显示的挂载路径。例如挂载目录为 `/var/data`，数据库路径可以设成 `/var/data/messages.db`。

数据库必须写入持久化磁盘，否则平台重启、重新部署或替换实例时，咨询记录可能丢失。磁盘路径要使用平台实际分配的路径，不要直接照抄示例。保持单个应用实例；多实例需要改用共享数据库和共享限流存储。

### 4. 设置环境变量

在服务的 **Environment Variables / 环境变量 / Secrets / 密钥** 页面设置：

| 名称 | 示例 | 说明 |
| --- | --- | --- |
| `DB_PATH` | `/var/data/messages.db` | 必需。改为上一步持久化磁盘中的数据库文件路径。 |
| `CONTACT_ADMIN_TOKEN` | 随机生成的长字符串 | 可选。仅在需要使用管理接口查询咨询记录时设置。 |
| `TRUST_PROXY` | `1` | 仅当服务在可信反向代理后时设置为平台文档标明的代理跳数。 |
| `PORT` | 平台自动提供 | 通常无需手动设置，保留平台自动分配的端口。 |

需要管理令牌时，在已安装 Node.js 的电脑上运行以下命令生成：

```bash
node -p "require('node:crypto').randomBytes(32).toString('hex')"
```

将命令输出保存到平台的 `CONTACT_ADMIN_TOKEN` 密钥字段。不要把令牌写入源代码、README、公开截图或提交到 GitHub。没有配置令牌时，网站表单仍可提交，但 `GET /api/contact` 查询接口会关闭。

`TRUST_PROXY` 只填写云平台文档明确提供的可信代理层数，例如单层代理可能是 `1`。不确定时先保持未设置并查询平台文档；不要填 `true`。错误设置会导致按 IP 限流异常。

### 5. 部署并验证

1. 保存设置并点击 **Deploy / Create Web Service / 部署**。
2. 等待构建和启动完成，检查部署日志没有错误。
3. 在云平台的 **Domains / Custom Domains** 中使用平台提供的域名，或绑定自己的域名；确认 HTTPS 已启用。
4. 在浏览器打开站点地址，检查首页和页面导航。
5. 在地址后加 `/api/health`，例如 `https://你的域名/api/health`。返回内容包含 `"ok":true` 表示后端健康检查通过。
6. 如需验证表单入库，使用你有权测试的非敏感测试内容提交，然后通过受保护的管理流程检查记录；不要使用访客的真实个人资料做测试。

正式收集信息前，确认 HTTPS、`DB_PATH` 持久化磁盘挂载和平台备份策略均已配置。

### 6. 发布后更新

配置 GitHub 自动部署的平台通常会在 `main` 有新提交时自动部署。否则在平台服务页面点击 **Manual Deploy / Redeploy**，选择最新的 `main` 提交。部署后再次访问首页和 `/api/health` 检查状态。不要删除或替换存有数据库的持久化磁盘。

## 三、使用 Docker 部署到自己的服务器

适合已经准备好 Linux 服务器、Docker、域名和 HTTPS 反向代理的情况。不熟悉服务器运维时，优先使用上面的托管 Web Service。

### 1. 准备服务器

- 安装并启动 Docker Engine。
- 准备一个域名和 HTTPS 证书，并配置 Nginx、Caddy 或其他反向代理。
- 确认反向代理转发到本机 `127.0.0.1:3000`，并正确传递客户端 IP 和 HTTPS 请求头。

### 2. 构建镜像并启动

在服务器终端逐条运行：

```bash
git clone https://github.com/bin430451-beep/web-.git
cd web-
docker build -t media-site .
docker volume create media-site-data
docker run -d --name media-site --restart unless-stopped -p 127.0.0.1:3000:3000 -e DB_PATH=/app/data/messages.db -v media-site-data:/app/data media-site
```

容器只绑定本机回环地址 `127.0.0.1:3000`，由反向代理通过 HTTPS 对外提供网站。不要把容器端口改成公开的 `0.0.0.0:3000`，也不要绕过 HTTPS 直接收集咨询信息。

如需管理接口，在 `docker run` 命令中增加 `-e CONTACT_ADMIN_TOKEN=生成的随机令牌`。如果代理层数已由服务器配置确认，也可增加 `-e TRUST_PROXY=准确的跳数`。令牌应使用上一步命令生成，并妥善保管。

### 3. 验证 Docker 服务

在服务器运行：

```bash
curl http://127.0.0.1:3000/api/health
```

输出包含 `"ok":true` 表示应用已启动。然后用浏览器访问反向代理配置的 HTTPS 域名，确认页面正常。

数据库保存在命名卷 `media-site-data` 中。不要在清理容器时删除此卷；删除卷会删除咨询记录。

### 4. 发布 Docker 更新

在服务器项目目录执行：

```bash
git pull origin main
docker build -t media-site .
docker stop media-site
docker rm media-site
docker run -d --name media-site --restart unless-stopped -p 127.0.0.1:3000:3000 -e DB_PATH=/app/data/messages.db -v media-site-data:/app/data media-site
```

如果初次运行时添加了 `CONTACT_ADMIN_TOKEN` 或 `TRUST_PROXY`，更新时也要在最后的 `docker run` 命令中保留相同配置。启动后再次运行健康检查。此更新流程保留 `media-site-data` 数据卷。

## 常见问题

| 现象 | 检查和处理 |
| --- | --- |
| Pages 部署报 404，提示尚未启用 Pages | 在仓库 **Settings → Pages → Build and deployment** 将 **Source** 设为 **GitHub Actions**，再从 **Actions → Deploy GitHub Pages Demo → Run workflow** 重新发布。 |
| Actions 里的 `Build Check` 绿了，但页面没更新 | `Build Check` 只校验构建。检查并运行 `Deploy GitHub Pages Demo`。 |
| 正式网站显示 502 或无法连接 | 检查服务类型是 Web Service，部署日志是否正常，启动命令是否为 `npm start`，以及反向代理端口是否是 `3000`。 |
| 表单提交失败 | 正式站点检查 `/api/health`、服务日志和云平台是否支持 Node 后端；GitHub Pages 体验版不会把表单发送到服务器。 |
| 重启后咨询记录不见了 | 检查 `DB_PATH` 是否指向已挂载的持久化磁盘，或 Docker 是否继续挂载 `media-site-data`。 |
| 管理查询接口返回 503 | 设置 `CONTACT_ADMIN_TOKEN` 并重新部署。该设置只控制查询接口，不影响访客提交表单。 |
| 所有访客似乎共用限流额度 | 检查代理 IP 转发设置及 `TRUST_PROXY` 跳数是否与平台配置一致。 |

## 当前部署配置速查

- GitHub Pages 工作流：`.github/workflows/deploy-pages.yml`，推送 `main` 时发布体验版，也支持手动运行。
- 构建检查工作流：`.github/workflows/build.yml`，用于构建检查，不负责发布 Pages。
- Node.js 版本：`24`；服务启动命令：`npm start`。
- 容器配置：根目录 `Dockerfile`；健康检查路径：`/api/health`。
