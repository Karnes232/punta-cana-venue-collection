import { getVenuePlanningProfile } from "@/lib/venueProfiles"
import { PCVC_BRAND } from "@/lib/brand"
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  MessageCircle,
  Users,
} from "lucide-react"

interface VenuePlanningGuideProps {
  slug: string
  venueTitle: string
  location: string
  locale: "en" | "es"
  eventTypes?: { title: { en: string; es: string } }[]
}

export default function VenuePlanningGuide({
  slug,
  venueTitle,
  location,
  locale,
  eventTypes = [],
}: VenuePlanningGuideProps) {
  const profile = getVenuePlanningProfile(slug)
  const localize = (value?: { en: string; es: string }) =>
    value?.[locale] || value?.en || ""
  const defaultBestFor = eventTypes
    .map(eventType => eventType.title?.[locale] || eventType.title?.en)
    .filter(Boolean)
    .slice(0, 5)
  const bestFor = profile?.bestFor?.map(localize) || defaultBestFor
  const summary =
    localize(profile?.summary) ||
    (locale === "es"
      ? `${venueTitle} puede ser una opción para tu evento en ${location}, siempre que su capacidad, montaje, producción y reglas operativas se ajusten al programa. Nuestro equipo valida esos puntos antes de recomendar una contratación.`
      : `${venueTitle} may be a fit for your event in ${location} when its capacity, setup, production requirements and operating rules match the program. Our team validates those points before recommending a contract.`)
  const standardConsiderations =
    locale === "es"
      ? [
          "La capacidad final cambia según el montaje, el escenario, la producción y las áreas de servicio.",
          "La disponibilidad, los mínimos de alimentos y bebidas, los horarios y las reglas de proveedores deben reconfirmarse para cada fecha.",
          "Antes de contratar, verificamos accesos de carga, energía, internet, baños, climatización, accesibilidad y plan climático según el evento.",
        ]
      : [
          "Final capacity changes with the room setup, stage, production footprint and service areas.",
          "Availability, food-and-beverage minimums, operating hours and vendor rules must be reconfirmed for each date.",
          "Before contracting, we review loading access, power, internet, restrooms, climate control, accessibility and the weather plan required by the event.",
        ]
  const considerations = [
    ...(profile?.considerations?.map(localize) || []),
    ...standardConsiderations,
  ]
  const operations =
    locale === "es"
      ? [
          "Validación del venue, capacidad y montaje correcto",
          "Negociación y coordinación con el equipo del venue",
          "Producción audiovisual, escenario, branding y proveedores",
          "Transporte, alojamiento, registro y logística de invitados",
          "Operación bilingüe en sitio, cronograma y contingencias",
        ]
      : [
          "Venue, capacity and setup validation",
          "Negotiation and coordination with the venue team",
          "Audiovisual production, staging, branding and suppliers",
          "Transportation, accommodation, registration and guest logistics",
          "Bilingual onsite operation, timeline and contingency management",
        ]
  const whatsappMessage =
    locale === "es"
      ? `Quiero realizar un evento en ${venueTitle}. Necesito validar disponibilidad, capacidad, costos y operación.`
      : `I want to hold an event at ${venueTitle}. I need help validating availability, capacity, costs and operations.`

  return (
    <section
      aria-labelledby="venue-planning-guide-title"
      className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
    >
      <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golden">
            {locale === "es"
              ? "Análisis local del venue"
              : "Local venue intelligence"}
          </p>
          <h2
            id="venue-planning-guide-title"
            className="font-hero-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
          >
            {locale === "es"
              ? `¿Es ${venueTitle} adecuado para tu evento?`
              : `Is ${venueTitle} right for your event?`}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
            {summary}
          </p>

          {bestFor.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Users className="h-4 w-4 text-golden" aria-hidden="true" />
                {locale === "es" ? "Funciona mejor para" : "Best suited for"}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {bestFor.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile?.facts && profile.facts.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Building2 className="h-4 w-4 text-golden" aria-hidden="true" />
                {locale === "es"
                  ? "Datos publicados por el venue"
                  : "Venue-published facts"}
              </div>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {profile.facts.map(item => (
                  <div
                    key={`${item.label.en}-${item.value.en}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <dt className="text-xs uppercase tracking-[0.12em] text-white/55">
                      {localize(item.label)}
                    </dt>
                    <dd className="mt-1 text-lg font-bold text-white">
                      {localize(item.value)}
                    </dd>
                  </div>
                ))}
              </dl>
              {profile.sourceUrl && (
                <p className="mt-3 text-xs leading-5 text-white/50">
                  {locale === "es" ? "Fuente oficial: " : "Official source: "}
                  <a
                    href={profile.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline decoration-white/30 underline-offset-4 hover:text-white"
                  >
                    {profile.sourceLabel || venueTitle}
                  </a>
                  .{" "}
                  {locale === "es"
                    ? "Capacidades sujetas a montaje y confirmación del venue."
                    : "Capacities depend on setup and venue confirmation."}
                </p>
              )}
            </div>
          )}

          <div className="mt-8">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <BadgeCheck className="h-4 w-4 text-golden" aria-hidden="true" />
              {locale === "es"
                ? "Lo que hay que validar antes de reservar"
                : "What must be validated before booking"}
            </div>
            <ul className="mt-3 grid gap-3 text-sm leading-6 text-white/70 sm:grid-cols-2">
              {considerations.map(item => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2
                    className="mt-1 h-4 w-4 shrink-0 text-golden"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#f1bd50] px-5 py-9 text-slate-950 sm:px-8 sm:py-12 lg:px-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-800/70">
            Punta Cana Venue Collection
          </p>
          <h3 className="font-hero-display mt-3 text-3xl font-semibold leading-tight">
            {locale === "es"
              ? "Tu operador local para este venue"
              : "Your local operator for this venue"}
          </h3>
          <p className="mt-4 text-sm leading-6 text-slate-800">
            {locale === "es"
              ? "No solo localizamos el espacio. Representamos tu proyecto en República Dominicana y coordinamos toda la ejecución para que tengas un único equipo responsable."
              : "We do more than source the space. We represent your project in the Dominican Republic and coordinate the complete execution through one accountable local team."}
          </p>
          <ul className="mt-6 space-y-3 text-sm font-medium leading-5">
            {operations.map(item => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3">
            <a
              href="#venue-inquiry"
              className="block rounded-xl bg-slate-950 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-slate-800"
            >
              {locale === "es"
                ? "Solicitar viabilidad y propuesta"
                : "Request feasibility and proposal"}
            </a>
            <a
              href={`https://wa.me/${PCVC_BRAND.telephone}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-900/25 px-5 py-3.5 text-sm font-bold transition hover:bg-white/25"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-800/70">
            {locale === "es"
              ? "Punta Cana Venue Collection es una empresa independiente de planificación y producción; no somos propietarios ni representantes comerciales del venue salvo acuerdo escrito."
              : "Punta Cana Venue Collection is an independent planning and production company; we are not the venue owner or sales representative unless confirmed in writing."}
          </p>
        </div>
      </div>
    </section>
  )
}
