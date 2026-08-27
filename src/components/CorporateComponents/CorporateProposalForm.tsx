"use client"

import { FormEvent, useEffect, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

type Locale = "en" | "es"

interface Props {
  locale: Locale
  sourcePage: string
  venueSlug?: string
  id?: string
  compact?: boolean
}

const initialForm = {
  fullName: "",
  company: "",
  workEmail: "",
  phone: "",
  programType: "",
  preferredDates: "",
  groupSize: "",
  planningStage: "",
  notes: "",
}

export default function CorporateProposalForm({
  locale,
  sourcePage,
  venueSlug = "",
  id = "venue-proposal",
  compact = false,
}: Props) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [tracking, setTracking] = useState<Record<string, string>>({})
  const es = locale === "es"

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setTracking({
      referrer: document.referrer,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    })
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")

    const payload = new URLSearchParams({
      "form-name": "corporateVenueProposal",
      ...form,
      locale,
      sourcePage,
      venueSlug,
      ...tracking,
    })

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      })
      if (!response.ok) throw new Error("Form submission failed")
      setStatus("success")
      setForm(initialForm)
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3 text-charcoal outline-none transition focus:border-golden focus:ring-2 focus:ring-golden/20"

  if (status === "success") {
    return (
      <div
        id={id}
        className="rounded-2xl border border-golden/30 bg-white p-8 text-center shadow-sm"
        role="status"
      >
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-golden" />
        <h3 className="font-hero-display text-3xl text-charcoal">
          {es ? "Recibimos tu solicitud" : "We received your request"}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-charcoal/75">
          {es
            ? "Un especialista en operaciones locales revisará los datos y te contactará para confirmar alcance, marca y próximos pasos."
            : "A local operations specialist will review the details and contact you to confirm scope, brand requirements and next steps."}
        </p>
      </div>
    )
  }

  return (
    <form
      id={id}
      name="corporateVenueProposal"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={submit}
      className={`scroll-mt-36 rounded-2xl border border-golden/25 bg-ivory shadow-sm ${compact ? "p-5" : "p-6 md:p-8"}`}
    >
      <input type="hidden" name="form-name" value="corporateVenueProposal" />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input type="hidden" name="venueSlug" value={venueSlug} />
      <p className="hidden">
        <label>
          Do not fill this field <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-charcoal">
          {es ? "Nombre y apellido" : "Full name"}
          <input
            className={`${inputClass} mt-1.5`}
            name="fullName"
            autoComplete="name"
            required
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />
        </label>
        <label className="text-sm font-semibold text-charcoal">
          {es ? "Empresa" : "Company"}
          <input
            className={`${inputClass} mt-1.5`}
            name="company"
            autoComplete="organization"
            required
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
          />
        </label>
        <label className="text-sm font-semibold text-charcoal">
          {es ? "Correo corporativo" : "Work email"}
          <input
            className={`${inputClass} mt-1.5`}
            name="workEmail"
            type="email"
            autoComplete="email"
            required
            value={form.workEmail}
            onChange={e => setForm({ ...form, workEmail: e.target.value })}
          />
        </label>
        <label className="text-sm font-semibold text-charcoal">
          {es ? "Teléfono con código de país" : "Phone with country code"}
          <input
            className={`${inputClass} mt-1.5`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+1 829 000 0000"
            pattern="^\+[1-9][0-9\s().-]{7,19}$"
            title={
              es
                ? "Incluye el código de país, por ejemplo +1"
                : "Include the country code, for example +1"
            }
            required
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label className="text-sm font-semibold text-charcoal">
          {es ? "¿Qué necesitas ejecutar?" : "What do you need executed?"}
          <select
            className={`${inputClass} mt-1.5`}
            name="programType"
            required
            value={form.programType}
            onChange={e => setForm({ ...form, programType: e.target.value })}
          >
            <option value="">
              {es ? "Selecciona una opción" : "Select an option"}
            </option>
            <option value="white-label-full">
              {es
                ? "Operación white-label integral"
                : "Full white-label operations"}
            </option>
            <option value="white-label-representation">
              {es
                ? "Representación local bajo nuestra marca"
                : "Local representation under our brand"}
            </option>
            <option value="production-logistics">
              {es
                ? "Producción y logística local"
                : "Local production and logistics"}
            </option>
            <option value="venue-inspection">
              {es
                ? "Selección de venue e inspección gratuita"
                : "Venue sourcing and complimentary inspection"}
            </option>
            <option value="conference">
              {es ? "Conferencia o reunión" : "Conference or meeting"}
            </option>
            <option value="retreat">
              {es ? "Retiro ejecutivo" : "Executive retreat"}
            </option>
            <option value="offsite">
              {es ? "Offsite empresarial" : "Company offsite"}
            </option>
            <option value="incentive">
              {es ? "Viaje de incentivo" : "Incentive travel"}
            </option>
            <option value="team-building">
              {es ? "Integración de equipos" : "Team building"}
            </option>
            <option value="other">
              {es ? "Otro programa grupal" : "Other group program"}
            </option>
          </select>
        </label>
        <label className="text-sm font-semibold text-charcoal">
          {es ? "Fechas preferidas" : "Preferred dates"}
          <input
            className={`${inputClass} mt-1.5`}
            name="preferredDates"
            placeholder={es ? "Ej. 12–15 de noviembre" : "E.g. November 12–15"}
            required
            value={form.preferredDates}
            onChange={e => setForm({ ...form, preferredDates: e.target.value })}
          />
        </label>
        <label className="text-sm font-semibold text-charcoal">
          {es ? "Cantidad estimada de personas" : "Estimated group size"}
          <input
            className={`${inputClass} mt-1.5`}
            name="groupSize"
            type="number"
            min="2"
            max="5000"
            required
            value={form.groupSize}
            onChange={e => setForm({ ...form, groupSize: e.target.value })}
          />
        </label>
        <label className="text-sm font-semibold text-charcoal">
          {es ? "Estado del proyecto" : "Project stage"}
          <select
            className={`${inputClass} mt-1.5`}
            name="planningStage"
            required
            value={form.planningStage}
            onChange={e => setForm({ ...form, planningStage: e.target.value })}
          >
            <option value="">
              {es ? "Selecciona una opción" : "Select an option"}
            </option>
            <option value="exploring">
              {es ? "Explorando opciones" : "Exploring options"}
            </option>
            <option value="shortlist">
              {es
                ? "Definiendo proveedores y venue"
                : "Defining suppliers and venue"}
            </option>
            <option value="comparing">
              {es ? "Comparando propuestas" : "Comparing proposals"}
            </option>
            <option value="venue-selected">
              {es
                ? "Venue seleccionado; necesito operación"
                : "Venue selected; operations needed"}
            </option>
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold text-charcoal">
        {es
          ? "Notas y requisitos (opcional)"
          : "Notes and requirements (optional)"}
        <textarea
          className={`${inputClass} mt-1.5 min-h-28 resize-y`}
          name="notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
      </label>

      {status === "error" && (
        <p
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {es
            ? "No pudimos enviar la solicitud. Inténtalo otra vez o escríbenos a info@puntacanavenuecollection.com."
            : "We could not send the request. Please try again or email info@puntacanavenuecollection.com."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-golden px-6 py-3.5 font-semibold text-charcoal transition hover:bg-golden/85 disabled:cursor-wait disabled:opacity-60 md:w-auto"
      >
        {status === "sending"
          ? es
            ? "Enviando…"
            : "Sending…"
          : es
            ? "Hablar de mi programa"
            : "Discuss My Program"}
        {status !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="mt-3 text-xs text-charcoal/60">
        {es
          ? "Usaremos estos datos únicamente para responder esta solicitud."
          : "We will use these details only to respond to this request."}
      </p>
    </form>
  )
}
