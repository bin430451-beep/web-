<script setup>
defineProps({
  tag: { type: String, default: '' },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  align: { type: String, default: 'center' } // center | left
})
</script>

<template>
  <div class="section-title" :class="`is-${align}`">
    <span v-if="tag" class="section-tag">{{ tag }}</span>
    <h2 class="section-heading">{{ title }}</h2>
    <p v-if="desc" class="section-desc">{{ desc }}</p>
  </div>
</template>

<style scoped>
.section-title {
  max-width: 720px;
}

.section-title.is-center {
  margin: 0 auto;
  text-align: center;
}

.section-tag {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-cyan);
  border: 1px solid rgba(34, 211, 238, 0.35);
  background: rgba(34, 211, 238, 0.08);
  letter-spacing: 0.06em;
}

.section-heading {
  margin: 16px 0 0;
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800;
  line-height: 1.25;
  color: var(--text-main);
}

.section-desc {
  margin: 14px 0 0;
  color: var(--text-sub);
  font-size: 16px;
  line-height: 1.8;
}
</style>
