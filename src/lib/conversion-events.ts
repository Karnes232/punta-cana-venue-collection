export function trackConversion(
  event: string,
  detail: Record<string, string | number> = {},
) {
  if (typeof window === "undefined") return
  // Never include email, names, notes, filenames or arbitrary query strings.
  const payload = { event, ...detail }
  window.dispatchEvent(new CustomEvent("pcvc:conversion", { detail: payload }))
  const w = window as Window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(payload)
}
