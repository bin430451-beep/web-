import { reactive, ref } from 'vue'
import { submitContact } from '../services/contactApi'

export function useContactForm({ demoMode = false } = {}) {
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
  const errorMsg = ref('')

  function validate() {
    errors.name = form.name.trim() ? '' : '请填写您的称呼'
    errors.phone = /^1\d{10}$/.test(form.phone.trim()) ? '' : '请填写正确的 11 位手机号'
    errors.message = form.message.trim() ? '' : '请简单描述您的需求'
    return !errors.name && !errors.phone && !errors.message
  }

  async function submit() {
    errorMsg.value = ''
    if (!validate()) return false

    submitting.value = true
    try {
      await submitContact({ ...form }, { demoMode })
      submitted.value = true
      return true
    } catch (error) {
      errorMsg.value = error.message || '网络异常，请稍后再试'
      return false
    } finally {
      submitting.value = false
    }
  }

  function clearError() {
    errorMsg.value = ''
  }

  function reset() {
    Object.keys(form).forEach((key) => { form[key] = '' })
    Object.keys(errors).forEach((key) => { errors[key] = '' })
    errorMsg.value = ''
    submitted.value = false
  }

  return { form, errors, submitting, submitted, errorMsg, submit, clearError, reset }
}
