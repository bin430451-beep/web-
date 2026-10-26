<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { site } from '../config/site'
import { services, cases, process } from '../config/content'
import SectionTitle from '../components/SectionTitle.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'

// 展示：服务取前 6 项、案例取前 3 项
const serviceList = services
const caseList = cases.slice(0, 3)

// ===== 数字滚动 =====
const statEls = ref([])
let statObserver = null
let rafId = null

function animateValue(el, target, suffix) {
  const duration = 1200
  const start = performance.now()
  function tick(now) {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(target * eased).toLocaleString() + suffix
    if (p < 1) rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

function setupStats() {
  statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index)
          const stat = site.stats[idx]
          animateValue(entry.target, stat.value, stat.suffix)
          statObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.4 }
  )
  statEls.value.forEach((el) => statObserver.observe(el))
}

onMounted(() => {
  if (statEls.value.length) setupStats()
})
onBeforeUnmount(() => {
  if (statObserver) statObserver.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="home-page page-top-space">
    <!-- ===== Hero ===== -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <span class="glow glow-1"></span>
        <span class="glow glow-2"></span>
        <span class="grid-lines"></span>
        <div class="phone-deco" aria-hidden="true">
          <div class="phone-frame">
            <div class="phone-screen">
              <span class="phone-bar"></span>
              <span class="phone-row"></span>
              <span class="phone-row short"></span>
              <span class="phone-play-btn"></span>
              <span class="phone-heart"></span>
            </div>
          </div>
          <span class="phone-badge">12.6w 赞</span>
        </div>
      </div>
      <div class="container hero-inner">
        <RevealOnScroll>
          <p class="hero-kicker">专注内容 · 驱动增长</p>
          <h1 class="hero-title">{{ site.brand.slogan }}</h1>
          <p class="hero-desc">{{ site.brand.intro }}</p>
          <div class="platform-chips">
            <span v-for="p in site.platforms" :key="p" class="platform-chip">{{ p }}</span>
          </div>
          <div class="hero-actions">
            <router-link to="/cases" class="btn btn-primary">查看案例</router-link>
            <router-link to="/contact" class="btn btn-ghost">联系我们</router-link>
          </div>
        </RevealOnScroll>
      </div>
    </section>

    <!-- ===== 品牌滚动条 ===== -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="n in 2" :key="n" class="marquee-group">
          <template v-for="(svc, i) in serviceList" :key="i">
            <em>{{ svc.title }}</em>
            <i>✦</i>
          </template>
        </span>
      </div>
    </div>

    <!-- ===== 核心数据 ===== -->
    <section class="stats-band">
      <div class="container stats-grid">
        <div
          v-for="(stat, i) in site.stats"
          :key="stat.label"
          class="stat-item"
        >
          <div class="stat-value" ref="statEls" :data-index="i">0</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- ===== 服务预览 ===== -->
    <section class="section">
      <div class="container">
        <RevealOnScroll>
          <SectionTitle
            tag="OUR SERVICES"
            title="一站式短视频内容服务"
            desc="从内容生产到账号运营，从直播带货到达人营销，我们覆盖品牌内容增长的每一个环节。"
          />
        </RevealOnScroll>

        <div class="service-grid">
          <RevealOnScroll v-for="(svc, i) in serviceList" :key="svc.id" :delay="i * 60">
            <router-link to="/services" class="service-card">
              <div class="service-top">
                <span class="service-index">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="service-icon" aria-hidden="true"></span>
              </div>
              <h3 class="service-title">{{ svc.title }}</h3>
              <p class="service-desc">{{ svc.desc }}</p>
            </router-link>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- ===== 案例预览 ===== -->
    <section class="section section-alt">
      <div class="container">
        <RevealOnScroll>
          <SectionTitle
            tag="SELECTED CASES"
            title="用数据说话的代表案例"
            desc="以下为我们服务过的部分品牌案例，覆盖美妆、餐饮、3C、文旅等多个行业。"
          />
        </RevealOnScroll>

        <div class="case-grid">
          <RevealOnScroll v-for="(item, i) in caseList" :key="item.title" :delay="i * 60">
            <router-link to="/cases" class="case-card">
              <div class="case-cover" :class="item.tone">
                <span class="case-play" aria-hidden="true"></span>
                <span class="case-platform">{{ item.platform }}</span>
              </div>
              <div class="case-body">
                <span class="case-category">{{ item.category }}</span>
                <h3 class="case-title">{{ item.title }}</h3>
                <p class="case-desc">{{ item.desc }}</p>
                <span class="case-metrics">{{ item.metrics }}</span>
              </div>
            </router-link>
          </RevealOnScroll>
        </div>

        <div class="case-more">
          <router-link to="/cases" class="btn btn-ghost">查看全部案例</router-link>
        </div>
      </div>
    </section>

    <!-- ===== 服务流程 ===== -->
    <section class="section">
      <div class="container">
        <RevealOnScroll>
          <SectionTitle
            tag="HOW WE WORK"
            title="四步交付，全程透明"
            desc="标准化的项目流程，让每一步都清晰可控，交付结果可预期。"
          />
        </RevealOnScroll>

        <div class="process-grid">
          <RevealOnScroll v-for="(p, i) in process" :key="p.step" :delay="i * 80">
            <div class="process-item">
              <span class="process-step">{{ p.step }}</span>
              <h3 class="process-title">{{ p.title }}</h3>
              <p class="process-desc">{{ p.desc }}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="section cta-section">
      <div class="container cta-inner">
        <RevealOnScroll>
          <h2 class="cta-title">准备好让品牌内容<em class="gradient-text">破圈增长</em>了吗？</h2>
          <p class="cta-desc">告诉我们你的目标，我们给出内容与运营方案。</p>
          <router-link to="/contact" class="btn btn-primary">免费获取方案</router-link>
        </RevealOnScroll>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Hero ===== */
.hero {
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 80px 0 96px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
  animation: glow-breathe 9s ease-in-out infinite;
}

.glow-1 {
  width: 520px;
  height: 520px;
  top: -140px;
  left: -120px;
  background: rgba(34, 211, 238, 0.35);
}

.glow-2 {
  width: 460px;
  height: 460px;
  bottom: -160px;
  right: -100px;
  background: rgba(251, 113, 133, 0.32);
  animation-delay: 3s;
}

@keyframes glow-breathe {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.62;
    transform: scale(1.08);
  }
}

/* 竖屏手机装饰 */
.phone-deco {
  position: absolute;
  right: clamp(20px, 6vw, 110px);
  top: 50%;
  transform: translateY(-42%);
  display: none;
  z-index: 0;
}

.phone-frame {
  width: 132px;
  height: 262px;
  border-radius: 26px;
  padding: 8px;
  background: linear-gradient(160deg, rgba(34, 211, 238, 0.5), rgba(251, 113, 133, 0.5));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  animation: phone-float 6s ease-in-out infinite;
}

.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 19px;
  background:
    radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.35), transparent 55%),
    radial-gradient(circle at 70% 80%, rgba(251, 113, 133, 0.3), transparent 55%),
    #0d1322;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  position: relative;
}

.phone-bar {
  height: 4px;
  width: 42px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.28);
  margin: 0 auto 4px;
}

.phone-row {
  height: 22px;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(148, 163, 184, 0.32), rgba(148, 163, 184, 0.12));
}

.phone-row.short {
  width: 62%;
}

.phone-play-btn {
  width: 40px;
  height: 40px;
  margin: 8px auto 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  position: relative;
}

.phone-play-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-left: 8px solid #eef2f8;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  transform: translateX(1px);
}

.phone-heart {
  width: 18px;
  height: 18px;
  margin-top: 4px;
  background: rgba(251, 113, 133, 0.9);
  clip-path: polygon(50% 90%, 0 38%, 12% 24%, 38% 24%, 50% 36%, 62% 24%, 88% 24%, 100% 38%);
}

@keyframes phone-float {
  0%,
  100% {
    transform: translateY(0) rotate(-3deg);
  }
  50% {
    transform: translateY(-14px) rotate(3deg);
  }
}

.phone-badge {
  position: absolute;
  right: -8px;
  top: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #0b0f1a;
  background: linear-gradient(120deg, var(--accent-amber), #fde68a);
  box-shadow: 0 6px 18px rgba(251, 191, 36, 0.4);
  animation: badge-pulse 3.6s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

@media (min-width: 1240px) {
  .phone-deco {
    display: block;
  }
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}

.hero-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
}

.hero-kicker {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  letter-spacing: 0.14em;
  color: var(--accent-cyan);
  border: 1px solid rgba(34, 211, 238, 0.35);
  background: rgba(34, 211, 238, 0.08);
  margin-bottom: 24px;
}

.hero-title {
  font-size: clamp(34px, 6vw, 58px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.01em;
  margin-bottom: 22px;
}

.hero-desc {
  max-width: 640px;
  margin: 0 auto 26px;
  color: var(--text-sub);
  font-size: clamp(15px, 2vw, 17px);
  line-height: 1.9;
}

.platform-chips {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.platform-chip {
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--text-sub);
  border: 1px solid var(--border-soft);
  background: rgba(18, 26, 46, 0.6);
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.platform-chip:hover {
  color: var(--accent-cyan);
  border-color: rgba(34, 211, 238, 0.5);
  transform: translateY(-2px);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* ===== 品牌滚动条 ===== */
.marquee {
  overflow: hidden;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: var(--bg-elev);
  padding: 16px 0;
  white-space: nowrap;
}

.marquee-track {
  display: inline-flex;
  animation: marquee-scroll 26s linear infinite;
}

.marquee-group {
  display: inline-flex;
  align-items: center;
  gap: 40px;
  padding-right: 40px;
}

.marquee em {
  font-style: normal;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--text-dim);
  text-transform: uppercase;
}

.marquee i {
  font-style: normal;
  color: var(--accent-cyan);
  font-size: 12px;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}

/* ===== 数据条 ===== */
.stats-band {
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: var(--bg-elev);
  padding: 44px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 800;
  background: linear-gradient(120deg, var(--accent-cyan), var(--accent-coral));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.stat-label {
  margin-top: 6px;
  color: var(--text-dim);
  font-size: 14px;
  letter-spacing: 0.04em;
}

/* ===== 服务卡片 ===== */
.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 52px;
}

.service-card {
  display: block;
  height: 100%;
  padding: 26px;
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-coral));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.service-card:hover {
  transform: translateY(-6px);
  border-color: rgba(34, 211, 238, 0.45);
  box-shadow: var(--shadow-card);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.service-index {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-faint);
  letter-spacing: 0.1em;
}

.service-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.25), rgba(251, 113, 133, 0.25));
  position: relative;
}

.service-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-coral));
}

.service-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.service-desc {
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
}

/* ===== 案例卡片 ===== */
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 52px;
}

.case-card {
  display: block;
  height: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.case-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card);
}

.case-cover {
  position: relative;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tone-cyan {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.28), rgba(34, 211, 238, 0.06));
}
.tone-coral {
  background: linear-gradient(135deg, rgba(251, 113, 133, 0.28), rgba(251, 113, 133, 0.06));
}
.tone-amber {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.28), rgba(251, 191, 36, 0.06));
}
.tone-violet {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.28), rgba(167, 139, 250, 0.06));
}

.case-play {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(11, 15, 26, 0.55);
  backdrop-filter: blur(4px);
  position: relative;
  transition: transform 0.3s ease;
}

.case-play::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-left: 12px solid var(--text-main);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  transform: translateX(2px);
}

.case-card:hover .case-play {
  transform: scale(1.12);
}

.case-platform {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(11, 15, 26, 0.6);
  color: var(--text-sub);
}

.case-body {
  padding: 22px;
}

.case-category {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 12px;
  color: var(--accent-cyan);
  letter-spacing: 0.06em;
}

.case-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.case-desc {
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 14px;
}

.case-metrics {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-amber);
  background: rgba(251, 191, 36, 0.1);
}

.case-more {
  margin-top: 40px;
  text-align: center;
}

/* ===== 流程 ===== */
.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin-top: 52px;
}

.process-item {
  padding: 26px;
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
}

.process-step {
  display: block;
  font-size: 30px;
  font-weight: 800;
  background: linear-gradient(120deg, var(--accent-cyan), var(--accent-coral));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-bottom: 12px;
}

.process-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
}

.process-desc {
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
}

/* ===== CTA ===== */
.cta-section {
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(34, 211, 238, 0.16), transparent 70%);
}

.cta-inner {
  position: relative;
  text-align: center;
}

.cta-title {
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800;
  margin-bottom: 14px;
}

.cta-title em {
  font-style: normal;
}

.cta-desc {
  color: var(--text-sub);
  margin-bottom: 30px;
}

/* ===== 响应式 ===== */
@media (max-width: 960px) {
  .service-grid,
  .case-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 620px) {
  .service-grid,
  .case-grid,
  .process-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    min-height: auto;
    padding: 100px 0 72px;
  }
}
</style>
