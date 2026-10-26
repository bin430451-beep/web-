<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 480
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition name="top-fade">
    <button
      v-if="visible"
      class="back-to-top"
      aria-label="回到顶部"
      title="回到顶部"
      @click="scrollTop"
    >
      <span class="back-to-top-icon" aria-hidden="true"></span>
    </button>
  </transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 28px;
  bottom: 32px;
  z-index: 90;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  border: 1px solid rgba(34, 211, 238, 0.4);
  background: rgba(16, 22, 39, 0.9);
  backdrop-filter: blur(8px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.back-to-top:hover {
  transform: translateY(-3px);
  border-color: var(--accent-cyan);
  box-shadow: 0 8px 22px rgba(34, 211, 238, 0.3);
}

.back-to-top-icon {
  width: 10px;
  height: 10px;
  border-top: 2px solid var(--accent-cyan);
  border-left: 2px solid var(--accent-cyan);
  transform: rotate(45deg) translate(2px, 2px);
}

.top-fade-enter-active,
.top-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.top-fade-enter-from,
.top-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
