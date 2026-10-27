<script setup>
import { site } from '../config/site'
import { timeline, values } from '../config/content'
import SectionTitle from '../components/SectionTitle.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
import PageHero from '../components/PageHero.vue'

const strengths = [
  { title: '内容方法论', desc: '多年实战沉淀的内容创作与数据复盘体系，让产出可复制、效果可预期。' },
  { title: '全链路能力', desc: '策划、拍摄、剪辑、运营、直播、投流一体化交付，客户无需多头对接。' },
  { title: '平台资源', desc: '覆盖抖音、小红书、B站、视频号等主流平台，熟悉各平台算法与玩法。' },
  { title: '数据团队', desc: '独立的分析与复盘机制，每个项目都有周度数据报告与优化建议。' }
]
</script>

<template>
  <div class="about-page page-top-space">
    <!-- 页面头部 -->
    <PageHero tag="ABOUT US" :title="`关于${site.brand.name}`" :description="site.brand.intro" tone="cyan" />

    <!-- 公司简介 -->
    <section class="section">
      <div class="container about-intro">
        <RevealOnScroll>
          <SectionTitle
            align="left"
            tag="WHO WE ARE"
            title="短视频内容生态的专业服务商"
            desc=""
          />
        </RevealOnScroll>
        <RevealOnScroll :delay="80">
          <div class="intro-text">
            <p>
              {{ site.brand.name }}成立于 2021 年，是一家专注于短视频内容生态的传媒公司。
              我们相信，在信息过载的时代，优质内容依然是品牌与用户建立信任的最高效方式。
            </p>
            <p>
              过去几年，我们服务了美妆、餐饮、3C 数码、文旅等行业的 60+ 品牌客户，
              累计产出爆款视频 1200+ 支，全网粉丝矩阵总量突破 860 万。
              我们以内容为起点，帮助品牌完成从「被看见」到「被信任」，再到「被选择」的完整闭环。
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>

    <!-- 核心优势 -->
    <section class="section section-alt">
      <div class="container">
        <RevealOnScroll>
          <SectionTitle tag="WHY US" title="为什么选择我们" />
        </RevealOnScroll>
        <div class="strength-grid">
          <RevealOnScroll v-for="(s, i) in strengths" :key="s.title" :delay="i * 70">
            <div class="strength-card">
              <span class="strength-index">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="strength-title">{{ s.title }}</h3>
              <p class="strength-desc">{{ s.desc }}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- 企业文化 -->
    <section class="section">
      <div class="container">
        <RevealOnScroll>
          <SectionTitle tag="OUR VALUES" title="我们相信的事" />
        </RevealOnScroll>
        <div class="values-grid">
          <RevealOnScroll v-for="(v, i) in values" :key="v.title" :delay="i * 70">
            <div class="value-card">
              <span class="value-dot" aria-hidden="true"></span>
              <h3 class="value-title">{{ v.title }}</h3>
              <p class="value-desc">{{ v.desc }}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- 发展里程碑 -->
    <section class="section section-alt">
      <div class="container">
        <RevealOnScroll>
          <SectionTitle tag="MILESTONES" title="发展历程" />
        </RevealOnScroll>
        <div class="timeline">
          <RevealOnScroll
            v-for="(item, i) in timeline"
            :key="item.year"
            :delay="i * 60"
            class="timeline-item"
          >
            <span class="timeline-year">{{ item.year }}</span>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-desc">{{ item.desc }}</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container cta-inner">
        <RevealOnScroll>
          <h2 class="cta-title">与我们一起，让内容成为品牌增长引擎</h2>
          <router-link to="/contact" class="btn btn-primary">立即沟通合作</router-link>
        </RevealOnScroll>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 简介 */
.about-intro {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: start;
}

.intro-text p {
  color: var(--text-sub);
  font-size: 15px;
  line-height: 2;
  margin-bottom: 16px;
}

/* 优势 */
.strength-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
  margin-top: 52px;
}

.strength-card {
  padding: 26px;
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.strength-card:hover {
  transform: translateY(-4px);
  border-color: rgba(34, 211, 238, 0.45);
}

.strength-index {
  display: block;
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(120deg, var(--accent-cyan), var(--accent-coral));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-bottom: 12px;
}

.strength-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.strength-desc {
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
}

/* 价值观 */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 52px;
}

.value-card {
  text-align: center;
  padding: 34px 26px;
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
}

.value-dot {
  display: block;
  width: 14px;
  height: 14px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-coral));
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.55);
}

.value-title {
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 10px;
}

.value-desc {
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
}

/* 时间线 */
.timeline {
  position: relative;
  max-width: 760px;
  margin: 52px auto 0;
  padding-left: 26px;
  border-left: 2px solid rgba(34, 211, 238, 0.3);
}

.timeline-item {
  position: relative;
  padding: 0 0 36px 26px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -31px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.15);
}

.timeline-year {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-cyan);
  margin-bottom: 6px;
}

.timeline-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.timeline-desc {
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
  background: radial-gradient(ellipse at center, rgba(251, 113, 133, 0.14), transparent 70%);
}

.cta-inner {
  position: relative;
}

.cta-title {
  font-size: clamp(24px, 3.6vw, 34px);
  font-weight: 800;
  margin-bottom: 30px;
}

/* 响应式 */
@media (max-width: 860px) {
  .about-intro {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .values-grid {
    grid-template-columns: 1fr;
  }
  .strength-grid {
    grid-template-columns: 1fr;
  }
}
</style>
