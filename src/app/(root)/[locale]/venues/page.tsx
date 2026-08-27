import type { Metadata } from "next"
import VenueListingContent from "@/components/VenueComponents/VenueListingContent"
import { getIndividualVenues } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { getVenuePage } from "@/sanity/queries/VenuePage/VenuePage"
import { generateHreflangAlternates } from "@/lib/hreflang"
import { PCVC_BRAND } from "@/lib/brand"

const BASE_URL = "https://puntacanavenuecollection.com"

export default async function Venues({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "en" | "es" }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [{ locale }, searchParamsData, venuePage, individualVenues] =
    await Promise.all([
      params,
      searchParams,
      getVenuePage(),
      getIndividualVenues(),
    ])

  const initialFilters = {
    location:
      typeof searchParamsData.location === "string"
        ? searchParamsData.location
        : "",
    type:
      typeof searchParamsData.type === "string" ? searchParamsData.type : "",
    capacity:
      typeof searchParamsData.capacity === "string"
        ? searchParamsData.capacity
        : "",
    budget:
      typeof searchParamsData.budget === "string"
        ? searchParamsData.budget
        : "",
  }

  const localePrefix = locale === "es" ? "/es" : ""
  const pageUrl = `${BASE_URL}${localePrefix}/venues`
  const pageName =
    locale === "es"
      ? "Venues corporativos en Punta Cana y República Dominicana"
      : "Corporate Event Venues in Punta Cana & Dominican Republic"
  const pageDescription =
    locale === "es"
      ? "Compara venues, capacidades y ubicaciones con apoyo local para seleccionar, inspeccionar y ejecutar tu evento en República Dominicana."
      : "Compare venues, capacities and locations with local support to source, inspect and execute your event in the Dominican Republic."

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        inLanguage: locale === "es" ? "es-DO" : "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          name: PCVC_BRAND.name,
          url: BASE_URL,
        },
        mainEntity: {
          "@id": `${pageUrl}#venues`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#venues`,
        name: pageName,
        numberOfItems: individualVenues.length,
        itemListElement: individualVenues.map((venue, index) => {
          const name =
            venue.title?.[locale] || venue.title?.en || venue.venueName
          const url = `${BASE_URL}${localePrefix}/venues/${venue.slug.current}`
          return {
            "@type": "ListItem",
            position: index + 1,
            url,
            item: {
              "@type": "EventVenue",
              "@id": `${url}#venue`,
              name,
              url,
              image: venue.heroImage?.asset?.url,
              address: {
                "@type": "PostalAddress",
                addressLocality: venue.location?.location || "Punta Cana",
                addressCountry: "DO",
              },
              maximumAttendeeCapacity: venue.capacityCocktail || undefined,
            },
          }
        }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : "Home",
            item: `${BASE_URL}${locale === "es" ? "/es" : ""}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es" ? "Venues" : "Venues",
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <VenueListingContent
        venuePage={venuePage}
        individualVenues={individualVenues}
        locale={locale}
        initialFilters={initialFilters}
      />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}): Promise<Metadata> {
  const { locale } = await params
  const venuePage = await getVenuePage()
  const canonicalUrl = `${BASE_URL}${locale === "es" ? "/es" : ""}/venues`
  const title =
    locale === "es"
      ? "Venues corporativos en Punta Cana y República Dominicana"
      : "Corporate Event Venues in Punta Cana & Dominican Republic"
  const description =
    locale === "es"
      ? "Explora venues en Punta Cana y República Dominicana. Compara ubicación y capacidad con apoyo local para inspección y ejecución completa."
      : "Explore event venues in Punta Cana and the Dominican Republic. Compare location and capacity with local inspection and execution support."
  const imageUrl = venuePage?.heroImage?.asset?.url || PCVC_BRAND.logo

  return {
    title,
    description,
    keywords:
      locale === "es"
        ? [
            "venues corporativos Punta Cana",
            "salones para eventos República Dominicana",
            "venues para conferencias Punta Cana",
            "espacios para eventos corporativos",
            "inspección de venues Punta Cana",
          ]
        : [
            "corporate event venues Punta Cana",
            "Dominican Republic event venues",
            "conference venues Punta Cana",
            "meeting venues Dominican Republic",
            "venue sourcing Punta Cana",
          ],
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, "venues"),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: PCVC_BRAND.name,
      locale: locale === "es" ? "es_DO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_DO"],
      images: [
        {
          url: imageUrl,
          width:
            venuePage?.heroImage?.asset?.metadata?.dimensions?.width || 1200,
          height:
            venuePage?.heroImage?.asset?.metadata?.dimensions?.height || 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  }
}
