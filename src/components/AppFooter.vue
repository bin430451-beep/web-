<script setup>
import { site } from '../config/site'

const year = new Date().getFullYear()

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于我们' },
  { to: '/services', label: '服务内容' },
  { to: '/cases', label: '案例展示' },
  { to: '/contact', label: '联系我们' }
]
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>{{ site.brand.name }}</span>
        </div>
        <p class="footer-slogan">{{ site.brand.slogan }}</p>
        <p class="footer-intro">{{ site.brand.intro }}</p>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">站内导航</h4>
        <router-link v-for="link in navLinks" :key="link.to" :to="link.to" class="footer-link">
          {{ link.label }}
        </router-link>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">联系我们</h4>
        <p class="footer-item">邮箱：{{ site.contact.email }}</p>
        <p class="footer-item">电话：{{ site.contact.phone }}</p>
        <p class="footer-item">微信：{{ site.contact.wechat }}</p>
        <p class="footer-item">地址：{{ site.contact.address }}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <span>© {{ year }} {{ site.brand.name }} 版权所有</span>
        <span class="footer-en">{{ site.brand.en }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: #070a12;
  padding: 56px 0 0;
  margin-top: 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.2fr;
  gap: 40px;
  padding-bottom: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
  color: var(--text-main);
}

.brand-mark {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-coral));
  position: relative;
}

.brand-mark::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid #070a12;
  transform: translateY(1px);
}

.footer-slogan {
  margin-top: 14px;
  color: var(--accent-cyan);
  font-weight: 600;
}

.footer-intro {
  margin-top: 10px;
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.8;
  max-width: 360px;
}

.footer-title {
  margin-bottom: 16px;
  font-size: 15px;
  color: var(--text-main);
}

.footer-link {
  display: block;
  padding: 6px 0;
  color: var(--text-dim);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.25s ease;
}

.footer-link:hover {
  color: var(--accent-cyan);
}

.footer-item {
  padding: 5px 0;
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.7;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 18px 0;
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-faint);
  font-size: 13px;
}

.footer-en {
  letter-spacing: 0.08em;
}

@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
