import { NextRequest, NextResponse } from "next/server"
import { MAX_FILE_SIZE, scoreBrief, validateBrief } from "@/lib/rfp-validation"
import { capabilities, destinations } from "@/lib/enterprise"
export const runtime = "nodejs"
const fail = (status: number) =>
  NextResponse.json({ accepted: false }, { status })
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin")
  if (
    origin &&
    origin !== request.nextUrl.origin &&
    ![
      "https://puntacanavenuecollection.com",
      "https://www.puntacanavenuecollection.com",
    ].includes(origin)
  )
    return fail(403)
  const length = Number(request.headers.get("content-length") || 0)
  if (length > MAX_FILE_SIZE + 64000) return fail(413)
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data"))
    return fail(415)
  try {
    const reader = request.body?.getReader()
    if (!reader) return fail(400)
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_FILE_SIZE + 64000) {
        await reader.cancel()
        return fail(413)
      }
      chunks.push(value)
    }
    const bytes = Buffer.concat(chunks)
    const form = await new Response(bytes, {
      headers: { "content-type": request.headers.get("content-type")! },
    }).formData()
    if (String(form.get("bot-field") || "")) return fail(422)
    const allowed = [
      "mode",
      "locale",
      "sourcePage",
      "venueSlug",
      "fullName",
      "company",
      "workEmail",
      "phone",
      "country",
      "clientType",
      "programType",
      "preferredDates",
      "groupSize",
      "duration",
      "rooms",
      "destination",
      "budget",
      "notes",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "referrer",
    ]
    const data: Record<string, string> = {}
    for (const k of allowed) {
      const v = form.get(k)
      if (v !== null && typeof v !== "string") return fail(400)
      data[k] = String(v || "").trim()
    }
    if (
      !["rfp", "quick"].includes(data.mode) ||
      !["en", "es"].includes(data.locale) ||
      validateBrief(data, data.mode === "rfp").length
    )
      return fail(422)
    const services = form.getAll("services").map(String)
    if (services.some(s => !capabilities.some(c => c.slug === s)))
      return fail(422)
    data.services = services.join(",")
    if (
      data.destination &&
      ![...destinations, "undecided", "other"].includes(data.destination)
    )
      return fail(422)
    const out = new FormData()
    out.set(
      "form-name",
      data.mode === "quick" ? "corporateQuickBrief" : "corporateEventRfp",
    )
    out.set("bot-field", "")
    for (const [k, v] of Object.entries(data)) out.set(k, v)
    // Delivery must be configured before any document leaves this server.
    if (process.env.NETLIFY !== "true" || !process.env.URL) return fail(503)
    const attachment = form.get("attachment")
    if (attachment instanceof File && attachment.size) {
      // The receiver must provide private storage, malware scanning and retention controls.
      // Never put confidential documents in Netlify's public file-upload storage.
      if (
        process.env.NEXT_PUBLIC_PCVC_SECURE_UPLOADS_ENABLED !== "true" ||
        !process.env.PCVC_SECURE_UPLOAD_URL ||
        !process.env.PCVC_SECURE_UPLOAD_TOKEN
      )
        return fail(503)
      if (
        data.mode !== "rfp" ||
        attachment.size > MAX_FILE_SIZE ||
        !attachment.name.toLowerCase().endsWith(".pdf") ||
        !["application/pdf", ""].includes(attachment.type)
      )
        return fail(422)
      const content = Buffer.from(await attachment.arrayBuffer())
      if (
        content.subarray(0, 5).toString() !== "%PDF-" ||
        !content.subarray(-2048).toString().includes("%%EOF")
      )
        return fail(422)
      // Reject common active-content and embedded-file constructs. This is validation, not a virus scanner.
      if (
        /\/(JavaScript|JS|Launch|EmbeddedFile|RichMedia|OpenAction)\b/i.test(
          content.toString("latin1"),
        )
      )
        return fail(422)
      const receiver = new URL(process.env.PCVC_SECURE_UPLOAD_URL)
      if (receiver.protocol !== "https:") return fail(503)
      const uploaded = await fetch(receiver, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PCVC_SECURE_UPLOAD_TOKEN}`,
          "Content-Type": "application/pdf",
        },
        body: content,
        redirect: "error",
        signal: AbortSignal.timeout(15000),
      })
      if (!uploaded.ok) return fail(502)
      const receipt = await uploaded.json()
      if (
        typeof receipt.id !== "string" ||
        !/^[a-zA-Z0-9_-]{1,150}$/.test(receipt.id)
      )
        return fail(502)
      out.set("attachmentReference", receipt.id)
    }
    const score = scoreBrief(data)
    out.set("qualificationScore", String(score.score))
    out.set("qualificationSignals", score.signals)
    out.set("qualificationReview", score.review)
    const target = new URL("/__forms.html", process.env.URL)
    if (
      target.protocol !== "https:" ||
      !(
        target.hostname.endsWith(".netlify.app") ||
        [
          "puntacanavenuecollection.com",
          "www.puntacanavenuecollection.com",
        ].includes(target.hostname)
      )
    )
      return fail(503)
    const response = await fetch(target, {
      method: "POST",
      body: new URLSearchParams(
        [...out.entries()].map(([key, value]) => [key, String(value)]),
      ),
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) return fail(502)
    return NextResponse.json({ accepted: true })
  } catch {
    return fail(400)
  }
}
