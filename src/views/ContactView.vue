<script setup>
import { reactive, ref } from 'vue'
import { site } from '../config/site'
import RevealOnScroll from '../components/RevealOnScroll.vue'

const form = reactive({
  name: '',
  phone: '',
  company: '',
  service: '',
  message: ''
})

const errors = reactive({})
const submitting = ref(false)
const submitted = ref(false)

function validate() {
  errors.name = form.name.trim() ? '' : '请填写您的称呼'
  errors.phone = /^1\d{10}$/.test(form.phone.trim()) ? '' : '请填写正确的 11 位手机号'
  errors.message = form.message.trim() ? '' : '请简单描述您的需求'
  return !errors.name && !errors.phone && !errors.message
}

function onSubmit() {
  if (!validate()) return
  submitting.value = true
  // 纯前端演示：模拟提交，正式接入时在此调用后端接口
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 800)
}

function resetForm() {
  Object.keys(form).forEach((k) => (form[k] = ''))
  submitted.value = false
}

const contactItems = [
  { label: '商务邮箱', value: site.contact.email, hint: '方案与报价请发邮件' },
  { label: '联系电话', value: site.contact.phone, hint: '工作日 9:00 - 18:00' },
  { label: '微信咨询', value: site.contact.wechat, hint: '添加请备注「官网咨询」' },
  { label: '公司地址', value: site.contact.address, hint: '欢迎到访洽谈' }
]
</script>

<template>
  <div class="contact-page page-top-space">
    <!-- 页面头部 -->
    <section class="page-hero">
      <div class="container">
        <RevealOnScroll>
          <p class="page-kicker">CONTACT US</p>
          <h1 class="page-title">联系我们</h1>
          <p class="page-desc">
            无论您是品牌方、创业者还是内容创作者，都欢迎与我们聊聊。
            留下您的需求，我们会在 24 小时内回复。
          </p>
        </RevealOnScroll>
      </div>
    </section>

    <section class="section">
      <div class="container contact-layout">
        <!-- 联系信息 -->
        <div class="contact-info">
          <RevealOnScroll>
            <h2 class="info-title">联系方式</h2>
            <p class="info-sub">多种渠道，随时触达</p>
            <div class="info-list">
              <div v-for="item in contactItems" :key="item.label" class="info-item">
                <span class="info-label">{{ item.label }}</span>
                <span class="info-value">{{ item.value }}</span>
                <span class="info-hint">{{ item.hint }}</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <!-- 联系表单 -->
        <div class="contact-form-wrap">
          <RevealOnScroll :delay="80">
            <form class="contact-form" novalidate @submit.prevent="onSubmit">
              <h2 class="form-title">商务咨询</h2>

              <div v-if="submitted" class="form-success">
                <span class="success-icon" aria-hidden="true"></span>
                <h3>提交成功</h3>
                <p>感谢您的咨询，我们会在 24 小时内与您联系。</p>
                <button type="button" class="btn btn-ghost" @click="resetForm">再填一次</button>
              </div>

              <template v-else>
                <div class="form-row">
                  <div class="form-field">
                    <label for="name">称呼 *</label>
                    <input id="name" v-model="form.name" type="text" placeholder="怎么称呼您" />
                    <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
                  </div>
                  <div class="form-field">
                    <label for="phone">手机号 *</label>
                    <input id="phone" v-model="form.phone" type="tel" placeholder="11 位手机号" />
                    <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-field">
                    <label for="company">公司 / 品牌</label>
                    <input id="company" v-model="form.company" type="text" placeholder="选填" />
                  </div>
                  <div class="form-field">
                    <label for="service">感兴趣的服务</label>
                    <select id="service" v-model="form.service">
                      <option value="">请选择</option>
                      <option value="短视频制作">短视频制作</option>
                      <option value="账号代运营">账号代运营</option>
                      <option value="内容策划">内容策划</option>
                      <option value="直播运营">直播运营</option>
                      <option value="IP 孵化">IP 孵化</option>
                      <option value="达人营销">达人营销</option>
                    </select>
                  </div>
                </div>

                <div class="form-field">
                  <label for="message">需求描述 *</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    placeholder="简单描述您的品牌与目标，例如：我们是美妆品牌，希望 3 个月内账号涨粉 20 万"
                  ></textarea>
                  <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
                </div>

                <button type="submit" class="btn btn-primary form-submit" :disabled="submitting">
                  {{ submitting ? '提交中…' : '提交需求' }}
                </button>
              </template>
            </form>
          </RevealOnScroll>
        </div>
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
  background: radial-gradient(ellipse at 50% 0%, rgba(34, 211, 238, 0.14), transparent 60%);
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

/* 布局 */
.contact-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.4fr;
  gap: 48px;
  align-items: start;
}

/* 联系信息 */
.info-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 6px;
}

.info-sub {
  color: var(--text-dim);
  font-size: 14px;
  margin-bottom: 28px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  padding: 18px 20px;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
}

.info-label {
  display: block;
  font-size: 12px;
  color: var(--text-faint);
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.info-value {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 4px;
}

.info-hint {
  font-size: 13px;
  color: var(--text-dim);
}

/* 表单 */
.contact-form {
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
}

.form-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-field {
  margin-bottom: 16px;
}

.form-field label {
  display: block;
  font-size: 14px;
  color: var(--text-sub);
  margin-bottom: 8px;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--border-soft);
  background: var(--bg-base);
  color: var(--text-main);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.12);
}

.form-field textarea {
  resize: vertical;
  min-height: 96px;
}

.form-field select option {
  background: var(--bg-card);
  color: var(--text-main);
}

.field-error {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--accent-coral);
}

.form-submit {
  width: 100%;
  margin-top: 8px;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 提交成功 */
.form-success {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  display: block;
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.12);
  border: 2px solid var(--accent-cyan);
  position: relative;
}

.success-icon::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 22px;
  height: 12px;
  border-left: 3px solid var(--accent-cyan);
  border-bottom: 3px solid var(--accent-cyan);
  transform: rotate(-45deg) translate(1px, -2px);
}

.form-success h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.form-success p {
  color: var(--text-sub);
  margin-bottom: 24px;
}

/* 响应式 */
@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .contact-form {
    padding: 22px;
  }
}
</style>
