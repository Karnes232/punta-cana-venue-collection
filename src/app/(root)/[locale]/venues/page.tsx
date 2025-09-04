import VenueListingContent from "@/components/VenueComponents/VenueListingContent"
import { getIndividualVenues } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { getTypeVenue } from "@/sanity/queries/MainPage/MainPage"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getVenuePage } from "@/sanity/queries/VenuePage/VenuePage"

export default async function Venues({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "en" | "es" }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const searchParamsData = await searchParams

  // Extract initial filter values from URL parameters
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

  const venuePage = await getVenuePage()
  const individualVenues = await getIndividualVenues()
  const typeVenue = await getTypeVenue()
  const structuredData = await getStructuredData("venues")

  return (
    <>
      {structuredData?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData.seo.structuredData[locale],
          }}
        />
      )}
      <div className="min-h-screen">
        <VenueListingContent
          venuePage={venuePage}
          individualVenues={individualVenues}
          typeVenue={typeVenue}
          locale={locale}
          initialFilters={initialFilters}
        />
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
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("venues")

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://puntacanavenuecollection.com/venues"
  } else {
    canonicalUrl = "https://puntacanavenuecollection.com/es/venues"
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
