import type { Metadata } from "next"
import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import ServiceDescription from "@/components/VenueInspectionComponents/ServiceDescription"
import Header from "@/components/VenueInspectionComponents/Header"
import FavoritesList from "@/components/VenueInspectionComponents/FavoritesList"
import InspectionForm from "@/components/VenueInspectionComponents/InspectionForm"
import { getVenueInspectionPage } from "@/sanity/queries/VenueInspection/VenueInspectionPage"
import { generateHreflangAlternates } from "@/lib/hreflang"

export default async function Inspection({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const venueInspectionPage = await getVenueInspectionPage()
  const copy =
    locale === "es"
      ? {
          title:
            "Inspecciones gratuitas de venues para proyectos de eventos activos",
          servicesTitle: "Una inspección orientada a decisiones reales",
          servicesDescription:
            "Visitamos contigo los venues seleccionados, validamos su viabilidad operativa y conectamos cada decisión con la ejecución completa del evento en República Dominicana.",
          servicesItems: [
            [
              "Revisamos el brief",
              "Confirmamos fecha, asistentes, formato, presupuesto y necesidades técnicas antes de visitar.",
            ],
            [
              "Preparamos una selección práctica",
              "Priorizamos los venues que realmente pueden ejecutar el programa.",
            ],
            [
              "Coordinamos las visitas sin costo",
              "La inspección es gratuita para clientes con un proyecto de evento activo.",
            ],
            [
              "Damos seguimiento operativo",
              "Podemos continuar con venue, proveedores, producción, transporte y operación local completa.",
            ],
          ],
        }
      : {
          title: "Complimentary Venue Inspections for Active Event Projects",
          servicesTitle: "An inspection built around real decisions",
          servicesDescription:
            "We visit selected venues with you, validate operational fit and connect each decision to complete event execution in the Dominican Republic.",
          servicesItems: [
            [
              "Review the brief",
              "We confirm dates, attendance, format, budget and technical needs before the visit.",
            ],
            [
              "Build a practical shortlist",
              "We prioritize venues that can genuinely execute the program.",
            ],
            [
              "Coordinate complimentary visits",
              "Inspections are free for clients with an active event project.",
            ],
            [
              "Provide operational follow-up",
              "We can continue with venue, suppliers, production, transport and complete local operations.",
            ],
          ],
        }
  const servicesItems = copy.servicesItems.map(([title, description]) => ({
    title: { en: title, es: title },
    description: { en: description, es: description },
  }))
  const canonical = `https://puntacanavenuecollection.com${locale === "es" ? "/es" : ""}/inspection`
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.title,
    description: copy.servicesDescription,
    url: canonical,
    areaServed: { "@type": "Country", name: "Dominican Republic" },
    provider: {
      "@type": "Organization",
      name: "Punta Cana Venue Collection",
      url: "https://puntacanavenuecollection.com",
    },
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroComponentBlog
        heroImage={venueInspectionPage?.heroImage}
        heroTitle={copy.title}
      />
      <Header />
      <div className="min-h-screen bg-ivory">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-8">
              <ServiceDescription
                servicesTitle={copy.servicesTitle}
                servicesDescription={copy.servicesDescription}
                servicesItems={servicesItems}
                locale={locale}
              />

              {/* Inspection Form */}
            </div>

            {/* Sidebar with favorites */}
            <div className="lg:col-span-1">
              <FavoritesList locale={locale} />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <InspectionForm locale={locale} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"
  const canonicalUrl = `https://puntacanavenuecollection.com${es ? "/es" : ""}/inspection`
  const title = es
    ? "Inspecciones gratuitas de venues en República Dominicana | PCVC"
    : "Complimentary Venue Inspections in the Dominican Republic | PCVC"
  const description = es
    ? "Inspecciones gratuitas para proyectos de eventos activos, con selección de venues y apoyo operativo local en República Dominicana."
    : "Complimentary inspections for active event projects, with venue selection and local operational support across the Dominican Republic."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, "/inspection"),
    },
  }
}
