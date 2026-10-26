# 星屿传媒官网（占位品牌）

短视频 / 自媒体公司官网，基于 **Vue 3 + Vite + vue-router** 的多页展示站。

## 技术栈

- Vue 3.5（Composition API / `<script setup>`）
- Vite 5（相对路径构建，任意静态托管可部署）
- vue-router 4（hash 模式，无需服务端配置）
- 原生 CSS（暗色主题、响应式、滚动渐入动效，零 UI 框架依赖）

## 页面

| 路由 | 页面 |
| --- | --- |
| `/#/` | 首页（Hero 动画、平台标签、品牌滚动条、数据滚动、服务、案例、流程、CTA） |
| `/#/about` | 关于我们（简介、优势、价值观、发展历程） |
| `/#/services` | 服务内容（6 项服务、交付承诺） |
| `/#/cases` | 案例展示（6 个脱敏案例，支持按服务分类筛选） |
| `/#/contact` | 联系我们（联系信息 + 带校验的商务咨询表单） |

## 已内置的能力

- 全站回到顶部按钮（滚动 480px 后出现）
- 路由级 SEO：每页独立 `title` / `description`（`src/router/index.js` 中配置）
- 响应式布局：移动端汉堡菜单、卡片单列/双列/三列自适应
- 动效适配 `prefers-reduced-motion`
- GitHub Actions 自动构建并部署 GitHub Pages

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器（默认 http://localhost:5173）
npm run build    # 生产构建，产物输出到 dist/
npm run preview  # 本地预览构建产物
```

## 部署

### GitHub Pages（推荐，已内置 Actions 工作流）

1. 推送代码到 GitHub 仓库 `main` 分支
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. 每次 push 到 `main` 自动构建并部署，访问 `https://<用户名>.github.io/<仓库名>/`

### 其他静态托管（Nginx / 阿里云 OSS / 腾讯云 COS 等）

```bash
npm run build
# 将 dist/ 目录整体上传即可
```

## 替换占位内容（重要）

所有品牌与联系信息均为**占位内容**，集中维护在两个文件：

| 文件 | 内容 |
| --- | --- |
| `src/config/site.js` | 品牌名、slogan、简介、平台、联系方式、核心数据 |
| `src/config/content.js` | 服务、案例、流程、里程碑、价值观文案 |

替换后全站（导航、页脚、各页面、SEO title）同步生效。

页面入口标题与 Open Graph 标签在 `index.html` 中，可一并修改。
