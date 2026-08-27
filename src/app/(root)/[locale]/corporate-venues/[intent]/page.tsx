import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { getMainPage } from "@/sanity/queries/MainPage/MainPage"
import { generateHreflangAlternates } from "@/lib/hreflang"
import {
  corporateIntentSlugs,
  getCorporateIntent,
  Locale,
} from "@/lib/corporateContent"
import CorporatePageHero from "@/components/CorporateComponents/CorporatePageHero"
import CorporateProposalForm from "@/components/CorporateComponents/CorporateProposalForm"

interface PageProps {
  params: Promise<{ locale: Locale; intent: string }>
}

export function generateStaticParams() {
  return corporateIntentSlugs.map(intent => ({ intent }))
}

export default async function CorporateIntentPage({ params }: PageProps) {
  const { locale, intent: slug } = await params
  const intent = getCorporateIntent(slug)
  if (!intent) notFound()

  const mainPage = await getMainPage()
  const prefix = locale === "es" ? "/es" : ""
  const title = `${intent.title[locale]} ${locale === "es" ? "en República Dominicana" : "in the Dominican Republic"}`
  const canonical = `https://puntacanavenuecollection.com${prefix}/corporate-venues/${intent.slug}`
  const faqs =
    locale === "es"
      ? [
          [
            "¿Cómo comienza la operación white-label?",
            "Comienza con un brief del programa, los estándares de tu marca, las fechas, el grupo y el alcance. A partir de ahí coordinamos la ejecución local como extensión de tu agencia.",
          ],
          [
            "¿Las inspecciones tienen costo?",
            "No. Las inspecciones son gratuitas para clientes y agencias con un proyecto de evento activo en República Dominicana.",
          ],
          [
            "¿Pueden ejecutar todo bajo nuestra marca?",
            "Sí. Podemos representar a tu agencia, utilizar sus uniformes y protocolos, y coordinar venues, proveedores, producción, transporte, invitados y operación presencial.",
          ],
        ]
      : [
          [
            "How do white-label operations begin?",
            "We start with the program brief, your brand standards, dates, group and scope. We then coordinate local execution as an extension of your agency.",
          ],
          [
            "Are inspections complimentary?",
            "Yes. Inspections are complimentary for clients and agencies with an active event project in the Dominican Republic.",
          ],
          [
            "Can you execute everything under our brand?",
            "Yes. We can represent your agency, use its uniforms and protocols, and coordinate venues, suppliers, production, transport, guests and on-site operations.",
          ],
        ]

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: title,
        description: intent.metaDescription[locale],
        url: canonical,
        areaServed: { "@type": "Country", name: "Dominican Republic" },
        provider: {
          "@type": "Organization",
          name: "Punta Cana Venue Collection",
          url: "https://puntacanavenuecollection.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CorporatePageHero
        image={mainPage.heroImage}
        eyebrow={
          locale === "es"
            ? "Operación white-label"
            : "White-label event operations"
        }
        title={title}
        description={intent.metaDescription[locale]}
        primaryLabel={
          locale === "es" ? "Hablar de este programa" : "Discuss This Program"
        }
        secondaryLabel={
          locale === "es"
            ? "Ver todas las capacidades"
            : "View All Capabilities"
        }
        secondaryHref={`${prefix}/corporate-venues`}
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:py-20 lg:grid-cols-2">
        <article className="rounded-2xl border border-charcoal/10 bg-ivory p-7">
          <h2 className="font-hero-display text-4xl text-charcoal">
            {locale === "es" ? "Ideal para" : "Ideal for"}
          </h2>
          <ul className="mt-6 space-y-4">
            {intent.idealFor[locale].map(item => (
              <li key={item} className="flex gap-3 text-lg text-charcoal/75">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-golden" />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-charcoal/10 p-7">
          <h2 className="font-hero-display text-4xl text-charcoal">
            {locale === "es" ? "Qué operamos" : "What we operate"}
          </h2>
          <ul className="mt-6 space-y-4">
            {intent.priorities[locale].map(item => (
              <li key={item} className="flex gap-3 text-lg text-charcoal/75">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-turquoise" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-golden">
            {locale === "es"
              ? "Una sola operación local"
              : "One local operation"}
          </p>
          <h2 className="mt-3 max-w-4xl font-hero-display text-4xl md:text-6xl">
            {locale === "es"
              ? "Tu agencia lidera la relación. Nosotros ejecutamos en el destino."
              : "Your agency leads the relationship. We execute in destination."}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
            {locale === "es"
              ? "Coordinamos el venue, proveedores, producción, transporte, invitados, contingencias y personal presencial bajo el alcance y los estándares aprobados por tu agencia."
              : "We coordinate the venue, suppliers, production, transport, guests, contingencies and on-site team under the scope and standards approved by your agency."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h2 className="font-hero-display text-4xl text-charcoal md:text-6xl">
          {locale === "es"
            ? "Preguntas frecuentes"
            : "Frequently asked questions"}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map(([question, answer]) => (
            <article
              key={question}
              className="rounded-2xl border border-charcoal/10 p-6"
            >
              <h3 className="font-hero-display text-2xl text-charcoal">
                {question}
              </h3>
              <p className="mt-3 leading-7 text-charcoal/70">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 lg:grid-cols-[0.65fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-golden">
            {intent.title[locale]}
          </p>
          <h2 className="mt-3 font-hero-display text-4xl leading-tight text-charcoal md:text-6xl">
            {locale === "es"
              ? "Cuéntanos qué necesita ejecutar tu agencia"
              : "Tell us what your agency needs executed"}
          </h2>
        </div>
        <CorporateProposalForm
          locale={locale}
          sourcePage={`corporate-intent:${intent.slug}`}
        />
      </section>
    </main>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, intent: slug } = await params
  const intent = getCorporateIntent(slug)
  if (!intent) return {}
  const prefix = locale === "es" ? "/es" : ""
  const path = `/corporate-venues/${intent.slug}`
  const canonical = `https://puntacanavenuecollection.com${prefix}${path}`
  const title = `${intent.title[locale]} ${locale === "es" ? "en República Dominicana" : "in the Dominican Republic"} | PCVC`
  return {
    title,
    description: intent.metaDescription[locale],
    alternates: { canonical, ...generateHreflangAlternates(locale, path) },
    openGraph: {
      title,
      description: intent.metaDescription[locale],
      url: canonical,
      type: "website",
    },
  }
}
