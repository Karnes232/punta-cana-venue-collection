export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const EVENT_TYPES = [
  "conferences",
  "annual-meetings",
  "sales-kickoffs",
  "global-meetings",
  "corporate-summits",
  "product-launches",
  "partner-meetings",
  "trade-events",
  "incentive-programs",
  "awards-galas",
  "other",
]
export const BUDGETS = [
  "undecided",
  "under-50000",
  "50000-100000",
  "100000-250000",
  "250000-500000",
  "500000-plus",
]
export function validateBrief(
  data: Record<string, string>,
  full: boolean,
): string[] {
  const errors: string[] = []
  for (const key of [
    "fullName",
    "company",
    "workEmail",
    "preferredDates",
    "groupSize",
    ...(full
      ? ["country", "clientType", "programType", "duration", "budget"]
      : ["notes"]),
  ])
    if (!data[key]?.trim()) errors.push(key)
  if (data.workEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail))
    errors.push("workEmail")
  for (const key of ["groupSize", "rooms", "duration"]) {
    if (
      data[key] &&
      (!/^\d+$/.test(data[key]) ||
        Number(data[key]) < (key === "rooms" ? 0 : 1) ||
        Number(data[key]) > 1000000)
    )
      errors.push(key)
  }
  if (data.programType && !EVENT_TYPES.includes(data.programType))
    errors.push("programType")
  if (data.budget && !BUDGETS.includes(data.budget)) errors.push("budget")
  if (
    data.clientType &&
    !["company", "agency", "association"].includes(data.clientType)
  )
    errors.push("clientType")
  for (const [k, v] of Object.entries(data))
    if (v.length > (k === "notes" ? 10000 : 1000)) errors.push(k)
  return [...new Set(errors)]
}
export function scoreBrief(data: Record<string, string>) {
  let score = 0
  const signals: string[] = []
  if (data.budget && !["undecided", "under-50000"].includes(data.budget)) {
    score += 3
    signals.push("budget-scope")
  }
  if (Number(data.duration) >= 3) {
    score += 2
    signals.push("multi-day")
  }
  if (Number(data.rooms) >= 30) {
    score += 2
    signals.push("room-block")
  }
  if (data.services?.split(",").filter(Boolean).length >= 4) {
    score += 3
    signals.push("integrated-services")
  }
  if (Number(data.groupSize) >= 200) {
    score += 1
    signals.push("attendee-scale")
  }
  return {
    score,
    signals: signals.join(","),
    review: "Human review required; no automatic rejection",
  }
}
