<script setup>
import RevealOnScroll from './RevealOnScroll.vue'

defineProps({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tone: { type: String, default: 'cyan' }
})
</script>

<template>
  <section class="page-hero" :class="`tone-${tone}`">
    <div class="container">
      <RevealOnScroll>
        <p class="page-kicker">{{ tag }}</p>
        <h1 class="page-title">{{ title }}</h1>
        <p v-if="description" class="page-desc">{{ description }}</p>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 110px 0 70px;
  overflow: hidden;
  text-align: center;
  border-bottom: 1px solid var(--border-soft);
}

.tone-cyan {
  background: radial-gradient(ellipse at 50% 0%, rgba(34, 211, 238, 0.14), transparent 60%);
}

.tone-coral {
  background: radial-gradient(ellipse at 50% 0%, rgba(251, 113, 133, 0.13), transparent 60%);
}

.tone-amber {
  background: radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.12), transparent 60%);
}

.page-kicker {
  margin-bottom: 16px;
  color: var(--accent-cyan);
  font-size: 13px;
  letter-spacing: 0.16em;
}

.page-title {
  margin-bottom: 16px;
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 800;
}

.page-desc {
  max-width: 640px;
  margin: 0 auto;
  color: var(--text-sub);
  font-size: 16px;
  line-height: 1.9;
}
</style>
