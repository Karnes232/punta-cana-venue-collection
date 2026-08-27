import type { Metadata } from "next"
import Link from "next/link"
import {
  Building2,
  MapPinned,
  Route,
  Shirt,
  Truck,
  UsersRound,
} from "lucide-react"
import { getMainPage } from "@/sanity/queries/MainPage/MainPage"
import { generateHreflangAlternates } from "@/lib/hreflang"
import {
  corporateIntents,
  homeCorporateCopy,
  Locale,
} from "@/lib/corporateContent"
import CorporatePageHero from "@/components/CorporateComponents/CorporatePageHero"
import CorporateProposalForm from "@/components/CorporateComponents/CorporateProposalForm"

interface PageProps {
  params: Promise<{ locale: Locale }>
}

const content = {
  en: {
    title: "White-Label Event Operations in the Dominican Republic",
    description:
      "A complete local operations team for international agencies and planners. We represent your brand and execute venues, suppliers, production, transportation and guest logistics in Punta Cana and throughout the Dominican Republic.",
    eyebrow: "Your local team under your brand",
    primary: "Discuss a White-Label Program",
    secondary: "Explore Event Capabilities",
    introTitle:
      "Your agency leads the relationship. We deliver the destination.",
    intro:
      "Punta Cana Venue Collection becomes your operational extension in the Dominican Republic. Our team can use your uniforms, follow your protocols and represent your agency in front of clients, venues and suppliers while managing the complete local execution.",
    scopeTitle: "Everything your agency needs on the ground",
    scope: [
      [
        "White-label representation",
        "We work under your agency identity, uniforms and service standards.",
      ],
      [
        "Complete event management",
        "We coordinate the program from local planning through final on-site delivery.",
      ],
      [
        "Production and suppliers",
        "One accountable team for technical production, décor, catering, entertainment and specialist partners.",
      ],
      [
        "Guest logistics",
        "Airport movements, transportation, arrivals, departures and on-site guest flow.",
      ],
      [
        "Venue sourcing",
        "We identify and validate the right venue anywhere in the Dominican Republic.",
      ],
      [
        "Complimentary inspections",
        "Site visits are free for qualified clients actively planning an event in the country.",
      ],
    ],
    faqTitle: "White-label partnership questions",
    formTitle: "Build your Dominican Republic delivery team",
    formIntro:
      "Share the brief and the role you want us to assume. We will respond with the next practical step.",
  },
  es: {
    title: "Operación white-label de eventos en República Dominicana",
    description:
      "Un equipo operativo local completo para agencias y planners internacionales. Representamos tu marca y ejecutamos venues, proveedores, producción, transporte y logística de invitados en Punta Cana y toda República Dominicana.",
    eyebrow: "Tu equipo local bajo tu marca",
    primary: "Hablar de un programa white-label",
    secondary: "Explorar capacidades para eventos",
    introTitle:
      "Tu agencia lidera la relación. Nosotros ejecutamos el destino.",
    intro:
      "Punta Cana Venue Collection se convierte en tu extensión operativa en República Dominicana. Nuestro equipo puede utilizar tus uniformes, seguir tus protocolos y representar tu agencia ante clientes, venues y proveedores mientras maneja toda la ejecución local.",
    scopeTitle: "Todo lo que tu agencia necesita en el destino",
    scope: [
      [
        "Representación white-label",
        "Trabajamos bajo la identidad, los uniformes y los estándares de tu agencia.",
      ],
      [
        "Gestión integral del evento",
        "Coordinamos el programa desde la planificación local hasta la ejecución final.",
      ],
      [
        "Producción y proveedores",
        "Un equipo responsable para producción técnica, decoración, alimentos, entretenimiento y partners especializados.",
      ],
      [
        "Logística de invitados",
        "Aeropuerto, transporte, llegadas, salidas y flujo de invitados en el destino.",
      ],
      [
        "Selección de venues",
        "Identificamos y validamos el venue correcto en cualquier parte de República Dominicana.",
      ],
      [
        "Inspecciones gratuitas",
        "Las visitas son gratuitas para clientes calificados que estén planificando un evento real en el país.",
      ],
    ],
    faqTitle: "Preguntas sobre la alianza white-label",
    formTitle: "Construye tu equipo de ejecución en República Dominicana",
    formIntro:
      "Comparte el brief y el rol que debemos asumir. Responderemos con el siguiente paso práctico.",
  },
} as const

function getFaqs(locale: Locale) {
  return locale === "es"
    ? [
        [
          "¿Pueden operar completamente bajo la marca de nuestra agencia?",
          "Sí. Podemos utilizar sus uniformes, protocolos y comunicación acordada para actuar como su equipo y representante local en República Dominicana.",
        ],
        [
          "¿Trabajan directamente con nuestro cliente?",
          "Solo dentro del rol y del canal acordados con la agencia. La relación comercial de la agencia se respeta durante toda la operación.",
        ],
        [
          "¿Qué pueden ejecutar localmente?",
          "Podemos coordinar venues, proveedores, producción, transporte, actividades, alimentos y bebidas, invitados y operación completa en sitio.",
        ],
        [
          "¿Trabajan fuera de Punta Cana?",
          "Sí. Ejecutamos programas en toda República Dominicana y cotizamos la logística correspondiente según el destino y el alcance.",
        ],
        [
          "¿Las inspecciones tienen costo?",
          "No para clientes calificados con un proyecto real de evento en Punta Cana o República Dominicana. Revisamos primero el brief y coordinamos las visitas pertinentes.",
        ],
      ]
    : [
        [
          "Can you operate completely under our agency brand?",
          "Yes. We can use your uniforms, protocols and agreed communication style to act as your local team and representative in the Dominican Republic.",
        ],
        [
          "Will you work directly with our client?",
          "Only within the role and communication channel agreed with the agency. We protect the agency’s commercial relationship throughout the operation.",
        ],
        [
          "What can you execute locally?",
          "We can coordinate venues, suppliers, production, transportation, activities, food and beverage, guests and complete on-site operations.",
        ],
        [
          "Do you work outside Punta Cana?",
          "Yes. We execute programs throughout the Dominican Republic and quote the required logistics according to destination and scope.",
        ],
        [
          "Do site inspections have a fee?",
          "No for qualified clients with an active event project in Punta Cana or elsewhere in the Dominican Republic. We first review the brief and coordinate the relevant visits.",
        ],
      ]
}

export default async function CorporateVenuesPage({ params }: PageProps) {
  const { locale } = await params
  const mainPage = await getMainPage()
  const copy = content[locale]
  const prefix = locale === "es" ? "/es" : ""
  const faqs = getFaqs(locale)
  const canonical = `https://puntacanavenuecollection.com${prefix}/corporate-venues`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: copy.title,
        description: copy.description,
        areaServed: {
          "@type": "Place",
          name: "Punta Cana, Dominican Republic",
        },
        provider: {
          "@type": "Organization",
          name: "Punta Cana Venue Collection",
          url: "https://puntacanavenuecollection.com",
        },
        serviceType:
          "White-label destination event management and local operations",
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
        image={mainPage?.heroImage}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        primaryLabel={copy.primary}
        secondaryLabel={copy.secondary}
        secondaryHref="#capabilities"
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-golden">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 font-hero-display text-4xl leading-tight text-charcoal md:text-6xl">
            {copy.introTitle}
          </h2>
        </div>
        <p className="text-lg leading-8 text-charcoal/75">{copy.intro}</p>
      </section>

      <section className="border-y border-charcoal/10 bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <h2 className="font-hero-display text-4xl text-charcoal md:text-6xl">
            {locale === "es"
              ? "Elige el tipo de programa"
              : "Choose the program objective"}
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {corporateIntents.map(intent => (
              <Link
                key={intent.slug}
                href={`${prefix}/corporate-venues/${intent.slug}`}
                className="group rounded-2xl border border-charcoal/10 bg-white p-6 transition hover:-translate-y-1 hover:border-golden"
              >
                <Building2 className="h-7 w-7 text-golden" />
                <h3 className="mt-4 font-hero-display text-3xl text-charcoal">
                  {intent.title[locale]}
                </h3>
                <p className="mt-3 leading-7 text-charcoal/70">
                  {intent.shortDescription[locale]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 md:py-20"
      >
        <h2 className="max-w-4xl font-hero-display text-4xl text-charcoal md:text-6xl">
          {copy.scopeTitle}
        </h2>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {copy.scope.map(([title, description], index) => {
            const Icon = [
              Shirt,
              UsersRound,
              Building2,
              Truck,
              MapPinned,
              Route,
            ][index]
            return (
              <article
                key={title}
                className="rounded-2xl border border-charcoal/10 p-6"
              >
                <Icon className="h-7 w-7 text-turquoise" />
                <h3 className="mt-4 font-hero-display text-3xl text-charcoal">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-charcoal/70">{description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <h2 className="font-hero-display text-4xl md:text-6xl">
            {copy.faqTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <article
                key={question}
                className="rounded-2xl border border-white/15 bg-white/5 p-6"
              >
                <h3 className="font-hero-display text-2xl">{question}</h3>
                <p className="mt-3 leading-7 text-white/70">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:py-20 lg:grid-cols-[0.65fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-golden">
            {homeCorporateCopy[locale].formEyebrow}
          </p>
          <h2 className="mt-3 font-hero-display text-4xl leading-tight text-charcoal md:text-6xl">
            {copy.formTitle}
          </h2>
          <p className="mt-5 text-lg leading-8 text-charcoal/70">
            {copy.formIntro}
          </p>
        </div>
        <CorporateProposalForm locale={locale} sourcePage="corporate-venues" />
      </section>
    </main>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const prefix = locale === "es" ? "/es" : ""
  const canonical = `https://puntacanavenuecollection.com${prefix}/corporate-venues`
  const copy = content[locale]
  return {
    title:
      locale === "es"
        ? "Operación white-label de eventos en RD | PCVC"
        : "White-Label Event Operations Dominican Republic | PCVC",
    description: copy.description,
    keywords:
      locale === "es"
        ? [
            "operación white label eventos República Dominicana",
            "DMC white label Punta Cana",
            "producción eventos corporativos Punta Cana",
            "socio local para agencias",
          ]
        : [
            "white label event operations Dominican Republic",
            "white label DMC Punta Cana",
            "corporate event production Punta Cana",
            "local partner for event agencies",
          ],
    alternates: {
      canonical,
      ...generateHreflangAlternates(locale, "/corporate-venues"),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      type: "website",
    },
  }
}
