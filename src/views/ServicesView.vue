<script setup>
import { services } from '../config/content'
import SectionTitle from '../components/SectionTitle.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'

const promises = [
  { title: '透明报价', desc: '服务范围与价格白纸黑字，无隐形消费，按节点付款。' },
  { title: '节点同步', desc: '项目排期可视化，每周同步进度，关键节点提前确认。' },
  { title: '数据可查', desc: '所有投放与运营数据向客户开放，报表真实可溯源。' },
  { title: '专属团队', desc: '每个项目配备固定小组，对接人与服务人员全程不变。' }
]
</script>

<template>
  <div class="services-page page-top-space">
    <!-- 页面头部 -->
    <section class="page-hero">
      <div class="container">
        <RevealOnScroll>
          <p class="page-kicker">OUR SERVICES</p>
          <h1 class="page-title">服务内容</h1>
          <p class="page-desc">
            覆盖短视频内容生产、账号运营、直播带货与达人营销的全链路服务，
            从选题到成交，按需组合，灵活匹配品牌不同阶段的需求。
          </p>
        </RevealOnScroll>
      </div>
    </section>

    <!-- 服务列表 -->
    <section class="section">
      <div class="container">
        <div class="service-list">
          <RevealOnScroll v-for="(svc, i) in services" :key="svc.id">
            <article class="service-item" :class="{ 'is-reverse': i % 2 === 1 }">
              <div class="service-info">
                <span class="service-index">{{ String(i + 1).padStart(2, '0') }}</span>
                <h2 class="service-title">{{ svc.title }}</h2>
                <p class="service-desc">{{ svc.desc }}</p>
                <ul class="service-points">
                  <li v-for="point in svc.points" :key="point">{{ point }}</li>
                </ul>
              </div>
              <div class="service-visual" :class="`visual-${i % 3}`">
                <span class="visual-ring ring-1"></span>
                <span class="visual-ring ring-2"></span>
                <span class="visual-play" aria-hidden="true"></span>
                <span class="visual-tag">{{ svc.id.split('-').join(' / ') }}</span>
              </div>
            </article>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- 交付承诺 -->
    <section class="section section-alt">
      <div class="container">
        <RevealOnScroll>
          <SectionTitle tag="DELIVERY" title="服务交付承诺" />
        </RevealOnScroll>
        <div class="promise-grid">
          <RevealOnScroll v-for="(p, i) in promises" :key="p.title" :delay="i * 60">
            <div class="promise-card">
              <h3 class="promise-title">{{ p.title }}</h3>
              <p class="promise-desc">{{ p.desc }}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container cta-inner">
        <RevealOnScroll>
          <h2 class="cta-title">不确定需要哪些服务？<em class="gradient-text">告诉我们现状</em></h2>
          <p class="cta-desc">我们会在 24 小时内给出内容与运营建议。</p>
          <router-link to="/contact" class="btn btn-primary">免费咨询</router-link>
        </RevealOnScroll>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 页面头部 */
.page-hero {
  position: relative;
  padding: 110px 0 70px;
  overflow: hidden;
  text-align: center;
  background: radial-gradient(ellipse at 50% 0%, rgba(251, 113, 133, 0.13), transparent 60%);
  border-bottom: 1px solid var(--border-soft);
}

.page-kicker {
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--accent-cyan);
  margin-bottom: 16px;
}

.page-title {
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 800;
  margin-bottom: 16px;
}

.page-desc {
  max-width: 640px;
  margin: 0 auto;
  color: var(--text-sub);
  font-size: 16px;
  line-height: 1.9;
}

/* 服务条目 */
.service-list {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.service-item {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: center;
}

.service-item.is-reverse .service-visual {
  order: -1;
}

.service-index {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-faint);
  margin-bottom: 10px;
}

.service-title {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  margin-bottom: 14px;
}

.service-desc {
  color: var(--text-sub);
  font-size: 15px;
  line-height: 1.9;
  margin-bottom: 20px;
  max-width: 520px;
}

.service-points {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.service-points li {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--text-main);
  border: 1px solid var(--border-soft);
  background: var(--bg-card);
}

/* 服务视觉区 */
.service-visual {
  position: relative;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-0 {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.22), rgba(34, 211, 238, 0.03));
}
.visual-1 {
  background: linear-gradient(135deg, rgba(251, 113, 133, 0.22), rgba(251, 113, 133, 0.03));
}
.visual-2 {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.22), rgba(251, 191, 36, 0.03));
}

.visual-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.22);
}

.ring-1 {
  width: 190px;
  height: 190px;
}

.ring-2 {
  width: 120px;
  height: 120px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.14);
}

.visual-play {
  position: relative;
  z-index: 1;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(11, 15, 26, 0.5);
  backdrop-filter: blur(4px);
}

.visual-play::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-left: 15px solid var(--text-main);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  transform: translateX(3px);
}

.visual-tag {
  position: absolute;
  bottom: 18px;
  left: 18px;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.06em;
  background: rgba(11, 15, 26, 0.6);
  color: var(--text-sub);
}

/* 承诺 */
.promise-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin-top: 52px;
}

.promise-card {
  padding: 26px;
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.promise-card:hover {
  transform: translateY(-4px);
  border-color: rgba(251, 191, 36, 0.4);
}

.promise-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
}

.promise-desc {
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
}

/* CTA */
.cta-section {
  position: relative;
  overflow: hidden;
  text-align: center;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15), transparent 70%);
}

.cta-inner {
  position: relative;
}

.cta-title {
  font-size: clamp(24px, 3.6vw, 34px);
  font-weight: 800;
  margin-bottom: 12px;
}

.cta-title em {
  font-style: normal;
}

.cta-desc {
  color: var(--text-sub);
  margin-bottom: 30px;
}

/* 响应式 */
@media (max-width: 900px) {
  .service-item {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .service-item.is-reverse .service-visual {
    order: 0;
  }
  .service-visual {
    height: 220px;
  }
  .promise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .promise-grid {
    grid-template-columns: 1fr;
  }
}
</style>
