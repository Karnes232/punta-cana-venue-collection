import type { Metadata } from "next"
import { Mail, MessageCircle, Phone } from "lucide-react"
import CorporateProposalForm from "@/components/CorporateComponents/CorporateProposalForm"
import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import { PCVC_BRAND } from "@/lib/brand"
import { generateHreflangAlternates } from "@/lib/hreflang"

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const es = locale === "es"
  return (
    <>
      <HeroComponentBlog
        heroTitle={es ? "Hablemos de tu operación" : "Let’s discuss your operation"}
      />
      <main className="bg-white px-5 py-16 text-charcoal md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-golden">
              {es ? "Contacto directo" : "Direct contact"}
            </p>
            <h2 className="mt-4 font-hero-display text-4xl leading-tight md:text-5xl">
              {es
                ? "Comparte el alcance. Nosotros estructuramos la ejecución local."
                : "Share the scope. We will structure the local execution."}
            </h2>
            <p className="mt-5 leading-7 text-charcoal/70">
              {es
                ? "Cuéntanos qué necesita tu agencia, las fechas aproximadas y el tamaño del grupo. Te responderemos con los próximos pasos para operar en Punta Cana o cualquier punto de República Dominicana."
                : "Tell us what your agency needs, the approximate dates and group size. We will reply with the next steps to operate in Punta Cana or anywhere in the Dominican Republic."}
            </p>
            <div className="mt-8 space-y-3">
              <a href={`https://wa.me/${PCVC_BRAND.telephone}`} className="flex items-center gap-3 rounded-xl border border-charcoal/10 p-4 transition hover:border-golden">
                <MessageCircle className="h-5 w-5 text-golden" /> WhatsApp {PCVC_BRAND.phoneDisplay}
              </a>
              <a href={`tel:+${PCVC_BRAND.telephone}`} className="flex items-center gap-3 rounded-xl border border-charcoal/10 p-4 transition hover:border-golden">
                <Phone className="h-5 w-5 text-golden" /> {PCVC_BRAND.phoneDisplay}
              </a>
              <a href={`mailto:${PCVC_BRAND.email}`} className="flex items-center gap-3 rounded-xl border border-charcoal/10 p-4 transition hover:border-golden">
                <Mail className="h-5 w-5 text-golden" /> {PCVC_BRAND.email}
              </a>
            </div>
          </section>
          <CorporateProposalForm locale={locale} sourcePage="contact" />
        </div>
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
  const canonical = `https://puntacanavenuecollection.com${es ? "/es" : ""}/contact`
  return {
    title: es
      ? "Contacto para operaciones de eventos en República Dominicana"
      : "Contact for Event Operations in the Dominican Republic",
    description: es
      ? "Solicita apoyo white-label para venues, producción, logística y ejecución de eventos corporativos en República Dominicana."
      : "Request white-label support for venues, production, logistics and corporate event execution in the Dominican Republic.",
    alternates: { canonical, ...generateHreflangAlternates(locale, "contact") },
  }
}
