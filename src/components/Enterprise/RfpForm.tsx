"use client"
import { FormEvent, useRef, useState } from "react"
import {
  capabilities,
  destinations,
  eventTypes,
  Locale,
  prefix,
} from "@/lib/enterprise"
import { MAX_FILE_SIZE } from "@/lib/rfp-validation"
import { trackConversion } from "@/lib/conversion-events"
const uploadsEnabled =
  process.env.NEXT_PUBLIC_PCVC_SECURE_UPLOADS_ENABLED === "true"
export default function RfpForm({
  locale,
  compact = false,
  sourcePage = "submit-rfp",
  venueSlug = "",
  id = "rfp-form",
}: {
  locale: Locale
  compact?: boolean
  sourcePage?: string
  venueSlug?: string
  id?: string
}) {
  const es = locale === "es",
    [status, setStatus] = useState<"idle" | "sending" | "error">("idle"),
    [error, setError] = useState(""),
    started = useRef(false),
    errorRef = useRef<HTMLDivElement>(null)
  const l = (en: string, esText: string) => (es ? esText : en)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "sending") return
    const form = e.currentTarget
    const data = new FormData(form)
    const file = data.get("attachment")
    if (
      file instanceof File &&
      file.size &&
      (file.size > MAX_FILE_SIZE || !file.name.toLowerCase().endsWith(".pdf"))
    ) {
      setError(
        l(
          "Attach a PDF of up to 5 MB. Your other details have been kept.",
          "Adjunta un PDF de hasta 5 MB. Conservamos los demás datos.",
        ),
      )
      setStatus("error")
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }
    data.set("mode", compact ? "quick" : "rfp")
    data.set("locale", locale)
    const params = new URLSearchParams(window.location.search)
    const requestedSource = params.get("source") || ""
    const allowedSource =
      /^(what-we-do\/[a-z-]+|destinations(?:\/[a-z-]+)?|corporate-events\/[a-z-]+|for-agencies)$/.test(
        requestedSource,
      )
        ? requestedSource
        : sourcePage
    const requestedVenue = params.get("venue") || ""
    const selectedVenue =
      venueSlug ||
      (/^[a-z0-9-]{1,250}$/.test(requestedVenue) ? requestedVenue : "")
    data.set("sourcePage", allowedSource)
    data.set("venueSlug", selectedVenue)
    for (const k of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ])
      data.set(k, (params.get(k) || "").slice(0, 200))
    data.set(
      "referrer",
      document.referrer ? new URL(document.referrer).origin : "",
    )
    setStatus("sending")
    setError("")
    try {
      const r = await fetch("/api/rfp", { method: "POST", body: data })
      const result = await r.json()
      if (!r.ok || !result.accepted) throw new Error("Submission failed")
      trackConversion(compact ? "contact_submission" : "rfp_submission", {
        source: sourcePage,
        locale,
      })
      if (selectedVenue) trackConversion("venue_inquiry", { locale })
      if (allowedSource === "for-agencies")
        trackConversion("agency_inquiry", { locale })
      if (allowedSource.startsWith("what-we-do"))
        trackConversion("service_conversion", { source: allowedSource, locale })
      if (allowedSource.startsWith("destinations"))
        trackConversion("destination_conversion", {
          source: allowedSource,
          locale,
        })
      window.location.assign(`${prefix(locale)}/rfp-received`)
    } catch {
      setStatus("error")
      setError(
        l(
          "We could not confirm delivery. Your details are still here. Try again or email info@puntacanavenuecollection.com.",
          "No pudimos confirmar la entrega. Tus datos siguen aquí. Inténtalo de nuevo o escribe a info@puntacanavenuecollection.com.",
        ),
      )
      requestAnimationFrame(() => errorRef.current?.focus())
    }
  }
  const field = (
    name: string,
    label: string,
    type = "text",
    required = false,
    autoComplete?: string,
  ) => (
    <label className="pc-field" key={name}>
      {label}
      {required ? " *" : ""}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={type === "number" ? undefined : 250}
        min={type === "number" ? (name === "rooms" ? 0 : 1) : undefined}
        step={type === "number" ? 1 : undefined}
      />
    </label>
  )
  return (
    <form
      className="pc-form"
      id={id}
      onSubmit={submit}
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true
          trackConversion(compact ? "contact_form_start" : "rfp_form_start", {
            source: sourcePage,
            locale,
          })
        }
      }}
      method="post"
      encType="multipart/form-data"
      toolname={
        compact ? "start-corporate-event-project" : "submit-corporate-event-rfp"
      }
      tooldescription={l(
        "Send a corporate event brief to Punta Cana Venue Collection for review.",
        "Envía un brief de evento corporativo a Punta Cana Venue Collection para revisión.",
      )}
      aria-busy={status === "sending"}
    >
      <p className="pc-help">
        {l(
          "* Required. Approximate dates and estimates are welcome.",
          "* Obligatorio. Puedes indicar fechas aproximadas y estimaciones.",
        )}
      </p>
      <div className="pc-honeypot" aria-hidden="true">
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset>
        <legend>{l("01 / Your team", "01 / Tu equipo")}</legend>
        <div className="pc-fields">
          {field(
            "fullName",
            l("Full name", "Nombre y apellido"),
            "text",
            true,
            "name",
          )}
          {field(
            "company",
            l("Company / organization", "Empresa / organización"),
            "text",
            true,
            "organization",
          )}
          {field(
            "workEmail",
            l("Corporate email", "Correo corporativo"),
            "email",
            true,
            "email",
          )}
          {!compact &&
            field(
              "phone",
              l(
                "Phone / WhatsApp with country code",
                "Teléfono / WhatsApp con código de país",
              ),
              "tel",
              false,
              "tel",
            )}
          {!compact &&
            field(
              "country",
              l("Country", "País"),
              "text",
              true,
              "country-name",
            )}
          {!compact && (
            <label className="pc-field">
              {l("You represent", "Representas a")} *
              <select
                name="clientType"
                required
                defaultValue={sourcePage === "for-agencies" ? "agency" : ""}
              >
                <option value="">{l("Select", "Selecciona")}</option>
                <option value="company">
                  {l("Direct corporate client", "Cliente corporativo directo")}
                </option>
                <option value="agency">{l("Agency", "Agencia")}</option>
                <option value="association">
                  {l("Association / organization", "Asociación / organización")}
                </option>
              </select>
            </label>
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend>{l("02 / The event", "02 / El evento")}</legend>
        <div className="pc-fields">
          {!compact && (
            <label className="pc-field">
              {l("Event type", "Tipo de evento")} *
              <select name="programType" required defaultValue="">
                <option value="">{l("Select", "Selecciona")}</option>
                {eventTypes.map(x => (
                  <option key={x.slug} value={x.slug}>
                    {x.title[locale]}
                  </option>
                ))}
                <option value="other">
                  {l("Other corporate program", "Otro programa corporativo")}
                </option>
              </select>
            </label>
          )}
          {field(
            "preferredDates",
            l(
              "Preferred dates (approximate is fine)",
              "Fechas preferidas (pueden ser aproximadas)",
            ),
            "text",
            true,
          )}
          {field(
            "groupSize",
            l("Approximate attendees", "Asistentes aproximados"),
            "number",
            true,
          )}
          {!compact &&
            field(
              "duration",
              l("Duration in days", "Duración en días"),
              "number",
              true,
            )}
          {!compact &&
            field(
              "rooms",
              l("Approximate hotel rooms", "Habitaciones aproximadas"),
              "number",
            )}
          {!compact && (
            <label className="pc-field">
              {l("Destination", "Destino")}
              <select name="destination" defaultValue="undecided">
                <option value="undecided">
                  {l("Help us choose", "Ayúdennos a elegir")}
                </option>
                {destinations.map(x => (
                  <option key={x}>{x}</option>
                ))}
                <option value="other">
                  {l("Other / multiple destinations", "Otro / varios destinos")}
                </option>
              </select>
            </label>
          )}
          {!compact && (
            <label className="pc-field">
              {l(
                "Estimated total budget (USD)",
                "Presupuesto total estimado (USD)",
              )}{" "}
              *
              <select name="budget" required defaultValue="">
                <option value="">{l("Select", "Selecciona")}</option>
                <option value="undecided">
                  {l("Help us define it", "Por definir con su equipo")}
                </option>
                <option value="under-50000">
                  {l("Below $50,000", "Menos de $50,000")}
                </option>
                <option value="50000-100000">$50,000–$100,000</option>
                <option value="100000-250000">$100,000–$250,000</option>
                <option value="250000-500000">$250,000–$500,000</option>
                <option value="500000-plus">$500,000+</option>
              </select>
              <small>
                {l(
                  "For scoping; not a published price or minimum.",
                  "Para definir el alcance; no es una tarifa ni un mínimo.",
                )}
              </small>
            </label>
          )}
        </div>
      </fieldset>
      {!compact && (
        <fieldset>
          <legend>
            {l("03 / Services required", "03 / Servicios requeridos")}
          </legend>
          <div className="pc-checks">
            {capabilities.map(c => (
              <label key={c.slug}>
                <input type="checkbox" name="services" value={c.slug} />
                {c.title[locale]}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <fieldset>
        <legend>
          {compact
            ? l("03 / Your brief", "03 / Tu brief")
            : l("04 / Share the brief", "04 / Comparte el brief")}
        </legend>
        <label className="pc-field">
          {l(
            "What are you planning? Objectives and requirements",
            "¿Qué estás organizando? Objetivos y requisitos",
          )}
          {compact ? " *" : ""}
          <textarea name="notes" required={compact} maxLength={10000} />
        </label>
        {!compact && uploadsEnabled && (
          <label className="pc-field" style={{ marginTop: 24 }}>
            {l(
              "Already have an RFP? Upload it here.",
              "¿Ya tienes un RFP? Adjúntalo aquí.",
            )}
            <input
              type="file"
              name="attachment"
              accept=".pdf,application/pdf"
              onChange={e => {
                const f = e.target.files?.[0]
                if (f)
                  trackConversion("rfp_upload_selected", {
                    size_kb: Math.ceil(f.size / 1024),
                  })
              }}
            />
            <small>
              {l(
                "PDF, up to 5 MB. Export Word, Excel or PowerPoint files as PDF.",
                "PDF, hasta 5 MB. Exporta los archivos de Word, Excel o PowerPoint como PDF.",
              )}
            </small>
          </label>
        )}
        {!compact && !uploadsEnabled && (
          <p className="pc-help">
            {l(
              "Already have an RFP document? Mention it in your brief; our team will arrange the file transfer with you.",
              "¿Ya tienes un documento RFP? Indícalo en tu brief; nuestro equipo coordinará contigo la entrega del archivo.",
            )}
          </p>
        )}
      </fieldset>
      {status === "error" && (
        <div role="alert" tabIndex={-1} ref={errorRef} className="pc-error">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="pc-button"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? l("Sending…", "Enviando…")
          : compact
            ? l("Start Your Project", "Iniciar proyecto")
            : l("Submit Your RFP", "Enviar RFP")}{" "}
        ↗
      </button>
      <p className="pc-help">
        {l(
          "We use your details to review and respond to your project request.",
          "Usamos tus datos para revisar y responder a tu solicitud de proyecto.",
        )}{" "}
        <a className="underline" href={`${prefix(locale)}/privacy`}>
          {l("Privacy policy", "Política de privacidad")}
        </a>
      </p>
    </form>
  )
}
