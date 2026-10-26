import { createRouter, createWebHashHistory } from 'vue-router'
import { site } from '../config/site'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: '首页',
      description: `${site.brand.name}专注短视频内容制作、账号代运营、直播运营与达人营销，为品牌打造可持续增长的内容生态。`
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于我们',
      description: `了解${site.brand.name}的团队、核心优势、企业文化与发展历程。`
    }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/ServicesView.vue'),
    meta: {
      title: '服务内容',
      description: '短视频制作、账号代运营、内容策划、直播运营、IP 孵化、达人营销，覆盖内容增长全链路。'
    }
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('../views/CasesView.vue'),
    meta: {
      title: '案例展示',
      description: '美妆、餐饮、3C、文旅等行业真实品牌案例，用数据说话，见证增长。'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: '联系我们',
      description: `联系我们获取内容与运营方案，${site.brand.name}会在 24 小时内回复。`
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  // hash 模式：部署到 GitHub Pages / 任意静态托管均无需额外配置
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} · ${site.brand.name}`
  // 同步更新页面描述（SEO）
  const desc = document.querySelector('meta[name="description"]')
  if (desc && to.meta.description) {
    desc.setAttribute('content', to.meta.description)
  }
})

export default router
