<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { site } from '../config/site'

const menuOpen = ref(false)
const scrolled = ref(false)

const links = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于我们' },
  { to: '/services', label: '服务内容' },
  { to: '/cases', label: '案例展示' },
  { to: '/contact', label: '联系我们' }
]

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="app-nav" :class="{ 'is-scrolled': scrolled }">
    <div class="nav-inner container">
      <router-link to="/" class="brand" @click="menuOpen = false">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-name">{{ site.brand.name }}</span>
      </router-link>

      <nav class="nav-links" :class="{ 'is-open': menuOpen }" aria-label="主导航">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </router-link>
        <router-link to="/contact" class="nav-cta" @click="menuOpen = false">
          商务合作
        </router-link>
      </nav>

      <button
        class="nav-toggle"
        :class="{ 'is-active': menuOpen }"
        :aria-expanded="menuOpen"
        aria-label="切换菜单"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
}

.app-nav.is-scrolled {
  background: rgba(11, 15, 26, 0.86);
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.28);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-main);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02em;
}

.brand-mark {
  width: 26px;
  height: 26px;
  border-radius: 8px;
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
  border-top: 8px solid #0b0f1a;
  transform: translateY(1px);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link {
  position: relative;
  padding: 8px 14px;
  color: var(--text-sub);
  text-decoration: none;
  font-size: 15px;
  border-radius: 8px;
  transition: color 0.25s ease, background 0.25s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-coral));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: var(--text-main);
}

.nav-link.router-link-active {
  color: var(--text-main);
}

.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.nav-cta {
  margin-left: 10px;
  padding: 9px 20px;
  border-radius: 10px;
  color: #0b0f1a;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-coral));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(34, 211, 238, 0.35);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 8px;
}

.nav-toggle span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--text-main);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.nav-toggle.is-active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-toggle.is-active span:nth-child(2) {
  opacity: 0;
}
.nav-toggle.is-active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 860px) {
  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 16px 20px 24px;
    background: rgba(11, 15, 26, 0.97);
    backdrop-filter: blur(12px);
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s ease, opacity 0.3s ease;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
  }

  .nav-links.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    padding: 12px 14px;
    font-size: 16px;
  }

  .nav-link::after {
    display: none;
  }

  .nav-cta {
    margin: 10px 0 0;
    text-align: center;
  }
}
</style>
