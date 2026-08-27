import { getMainPage } from "@/sanity/queries/MainPage/MainPage"
import { getPageSeo } from "@/sanity/queries/SEO/seo"
import { getTypeVenue } from "@/sanity/queries/MainPage/MainPage"
import { getIndividualVenuesMapDetails } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import MainPageContent from "@/components/MainPageComponents/MainPageContent"
import { getCalendlyUrls } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import { generateHreflangAlternates } from "@/lib/hreflang"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  const mainPage = await getMainPage()
  const typeVenue = await getTypeVenue()
  const individualVenuesMapDetails = await getIndividualVenuesMapDetails()
  const calendlyUrls = await getCalendlyUrls()

  const venues = (individualVenuesMapDetails || []).map(venue => ({
    id: venue.slug.current,
    name: venue.title[locale],
    position: [venue.map.latitude, venue.map.longitude] as [number, number],
    image: venue.heroImage,
    href: `/venues/${venue.slug.current}`,
  }))

  // Transform venues for search functionality
  const searchVenues = (individualVenuesMapDetails || []).map(venue => ({
    title: venue.title,
    slug: venue.slug,
  }))

  const popupVenues = (individualVenuesMapDetails || []).map(venue => ({
    title: venue.title,
    slug: venue.slug,
  }))

  const prefix = locale === "es" ? "/es" : ""
  const homeDescription =
    locale === "es"
      ? "Operación white-label para agencias y planners internacionales: representación local, producción, proveedores, logística y ejecución de eventos en República Dominicana."
      : "White-label operations for international agencies and planners: local representation, production, suppliers, logistics and event execution across the Dominican Republic."
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://puntacanavenuecollection.com/#organization",
        name: "Punta Cana Venue Collection",
        url: "https://puntacanavenuecollection.com",
        email: "info@puntacanavenuecollection.com",
        telephone: "+1-829-522-2900",
        areaServed: { "@type": "Country", name: "Dominican Republic" },
      },
      {
        "@type": "WebSite",
        "@id": "https://puntacanavenuecollection.com/#website",
        url: "https://puntacanavenuecollection.com",
        name: "Punta Cana Venue Collection",
        inLanguage: locale === "es" ? "es" : "en",
        publisher: {
          "@id": "https://puntacanavenuecollection.com/#organization",
        },
      },
      {
        "@type": "Service",
        name:
          locale === "es"
            ? "Operación white-label de eventos en República Dominicana"
            : "White-label event operations in the Dominican Republic",
        description: homeDescription,
        provider: {
          "@id": "https://puntacanavenuecollection.com/#organization",
        },
        areaServed: { "@type": "Country", name: "Dominican Republic" },
        url: `https://puntacanavenuecollection.com${prefix}/corporate-venues`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MainPageContent
        mainPage={mainPage}
        locale={locale}
        typeVenue={typeVenue}
        searchVenues={searchVenues}
        venues={venues}
        popupVenues={popupVenues}
        calendlyUrls={calendlyUrls?.calendlyUrls}
      />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("home")

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://puntacanavenuecollection.com"
  } else {
    canonicalUrl = "https://puntacanavenuecollection.com/es"
  }

  return {
    title:
      locale === "es"
        ? "Operación white-label de eventos en República Dominicana | PCVC"
        : "White-Label Event Operations in the Dominican Republic | PCVC",
    description:
      locale === "es"
        ? "Representamos agencias y planners internacionales con producción, proveedores, logística y ejecución local en toda República Dominicana."
        : "We represent international agencies and planners with production, suppliers, logistics and local execution across the Dominican Republic.",
    keywords:
      locale === "es"
        ? [
            "operación white-label eventos República Dominicana",
            "DMC white-label Punta Cana",
            "producción de eventos República Dominicana",
            "agencia local eventos Punta Cana",
          ]
        : [
            "white-label event operations Dominican Republic",
            "white-label DMC Punta Cana",
            "event production Dominican Republic",
            "local event agency Punta Cana",
          ],
    url: canonicalUrl,
    openGraph: {
      title:
        locale === "es"
          ? "Operación white-label en República Dominicana"
          : "White-Label Event Operations in the Dominican Republic",
      description:
        locale === "es"
          ? "Tu marca al frente; nuestro equipo local ejecutando en toda República Dominicana."
          : "Your brand in front; our local team executing across the Dominican Republic.",
      ...(pageSeo?.seo?.openGraph?.image?.url && {
        images: pageSeo.seo.openGraph.image.url,
      }),
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: pageSeo ? !pageSeo.seo.noIndex : true,
      follow: pageSeo ? !pageSeo.seo.noFollow : true,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, ""),
    },
  }
}
