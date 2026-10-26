<script setup>
import { cases } from '../config/content'
import RevealOnScroll from '../components/RevealOnScroll.vue'
</script>

<template>
  <div class="cases-page page-top-space">
    <!-- 页面头部 -->
    <section class="page-hero">
      <div class="container">
        <RevealOnScroll>
          <p class="page-kicker">SELECTED CASES</p>
          <h1 class="page-title">案例展示</h1>
          <p class="page-desc">
            每一组数据背后，都是一次内容与策略的双重验证。
            以下案例均来自我们服务过的真实品牌项目。
          </p>
        </RevealOnScroll>
      </div>
    </section>

    <!-- 案例网格 -->
    <section class="section">
      <div class="container">
        <div class="case-grid">
          <RevealOnScroll v-for="(item, i) in cases" :key="item.title" :delay="(i % 3) * 70">
            <article class="case-card">
              <div class="case-cover" :class="item.tone">
                <span class="case-play" aria-hidden="true"></span>
                <span class="case-platform">{{ item.platform }}</span>
              </div>
              <div class="case-body">
                <div class="case-meta">
                  <span class="case-category">{{ item.category }}</span>
                  <span class="case-metrics">{{ item.metrics }}</span>
                </div>
                <h2 class="case-title">{{ item.title }}</h2>
                <p class="case-desc">{{ item.desc }}</p>
              </div>
            </article>
          </RevealOnScroll>
        </div>

        <div class="case-note">
          <RevealOnScroll>
            <p>
              为保护客户商业信息，以上案例均经脱敏处理。更多行业案例与数据报告，
              欢迎<a href="#/contact">联系我们</a>获取。
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container cta-inner">
        <RevealOnScroll>
          <h2 class="cta-title">下一个爆款案例，<em class="gradient-text">会是你吗？</em></h2>
          <p class="cta-desc">带上你的品牌现状，我们聊聊增长路径。</p>
          <router-link to="/contact" class="btn btn-primary">开启合作</router-link>
        </RevealOnScroll>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 110px 0 70px;
  overflow: hidden;
  text-align: center;
  background: radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.12), transparent 60%);
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

/* 网格 */
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.case-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.case-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card);
}

.case-cover {
  position: relative;
  height: 200px;
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

.case-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.case-category {
  font-size: 12px;
  color: var(--accent-cyan);
  letter-spacing: 0.06em;
}

.case-metrics {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-amber);
  background: rgba(251, 191, 36, 0.1);
}

.case-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.case-desc {
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
}

.case-note {
  margin-top: 48px;
  text-align: center;
  color: var(--text-dim);
  font-size: 14px;
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
@media (max-width: 960px) {
  .case-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .case-grid {
    grid-template-columns: 1fr;
  }
}
</style>
