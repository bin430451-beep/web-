/** Submit a business inquiry to the configured backend. */
export async function submitContact(payload, { demoMode = false } = {}) {
  if (demoMode) {
    await new Promise((resolve) => window.setTimeout(resolve, 400))
    return { demo: true }
  }

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || '提交失败，请稍后再试')
  }

  return data
}
