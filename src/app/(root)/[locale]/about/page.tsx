import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Network, ShieldCheck } from "lucide-react"
import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import { generateHreflangAlternates } from "@/lib/hreflang"

export default async function About({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const es = locale === "es"
  const prefix = es ? "/es" : ""
  const capabilities = [
    {
      icon: BadgeCheck,
      title: es ? "Tu marca permanece al frente" : "Your brand stays in front",
      text: es
        ? "Operamos con tus uniformes, protocolos y estándares para representar a tu agencia de forma coherente ante clientes, venues y proveedores."
        : "We operate with your uniforms, protocols and standards to represent your agency consistently in front of clients, venues and suppliers.",
    },
    {
      icon: Network,
      title: es ? "Una sola operación local" : "One local operation",
      text: es
        ? "Coordinamos venues, producción, logística, transporte, alimentos, actividades y proveedores en Punta Cana y toda República Dominicana."
        : "We coordinate venues, production, logistics, transport, catering, activities and suppliers across Punta Cana and the Dominican Republic.",
    },
    {
      icon: ShieldCheck,
      title: es ? "Ejecución responsable" : "Accountable execution",
      text: es
        ? "Un equipo local asume el seguimiento operativo antes, durante y después del programa, con comunicación directa y control de cada detalle."
        : "A local team owns operational follow-through before, during and after the program, with direct communication and control of every detail.",
    },
  ]

  return (
    <>
      <HeroComponentBlog
        heroTitle={
          es
            ? "Tu equipo operativo en República Dominicana"
            : "Your operating team in the Dominican Republic"
        }
      />
      <main className="bg-ivory text-charcoal">
        <section className="mx-auto max-w-5xl px-5 py-16 text-center md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-golden">
            {es ? "White-label para agencias" : "White-label for agencies"}
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl font-hero-display text-4xl leading-tight md:text-6xl">
            {es
              ? "Tu agencia conserva la relación. Nosotros hacemos posible la ejecución local."
              : "Your agency owns the relationship. We make local execution happen."}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-charcoal/75">
            {es
              ? "Punta Cana Venue Collection es el socio operativo para planners y agencias internacionales que necesitan producir eventos en República Dominicana sin improvisar una red local desde cero. No competimos por tu cliente: fortalecemos tu capacidad de entrega."
              : "Punta Cana Venue Collection is the operating partner for international planners and agencies producing events in the Dominican Republic without building a local network from scratch. We do not compete for your client: we strengthen your delivery capacity."}
          </p>
          <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-golden/25 bg-white p-6 shadow-sm"
              >
                <Icon className="h-8 w-8 text-golden" aria-hidden="true" />
                <h3 className="mt-5 font-hero-display text-2xl">{title}</h3>
                <p className="mt-3 leading-7 text-charcoal/70">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`${prefix}/corporate-venues#venue-proposal`}
              className="inline-flex items-center gap-2 rounded-full bg-golden px-7 py-3.5 font-semibold text-charcoal transition hover:brightness-95"
            >
              {es ? "Cuéntanos qué necesitas ejecutar" : "Tell us what you need executed"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`${prefix}/corporate-venues`}
              className="inline-flex items-center rounded-full border border-charcoal/20 px-7 py-3.5 font-semibold transition hover:border-golden"
            >
              {es ? "Ver capacidades" : "View capabilities"}
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"
  const canonical = `https://puntacanavenuecollection.com${es ? "/es" : ""}/about`
  return {
    title: es
      ? "Equipo operativo white-label en República Dominicana"
      : "White-Label Event Operations in the Dominican Republic",
    description: es
      ? "Socio local para agencias y planners internacionales: venues, producción, logística y ejecución de eventos bajo tu marca en República Dominicana."
      : "Local partner for international agencies and planners: venues, production, logistics and event execution under your brand in the Dominican Republic.",
    alternates: { canonical, ...generateHreflangAlternates(locale, "about") },
  }
}
