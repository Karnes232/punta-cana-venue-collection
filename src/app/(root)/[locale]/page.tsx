import { getMainPage } from "@/sanity/queries/MainPage/MainPage"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getTypeVenue } from "@/sanity/queries/MainPage/MainPage"
import { getIndividualVenuesMapDetails } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import ClientMainPageContent from "@/components/MainPageComponents/ClientMainPageContent"
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
  const structuredData = await getStructuredData("home")
  const individualVenuesMapDetails = await getIndividualVenuesMapDetails()
  const calendlyUrls = await getCalendlyUrls()

  const venues = individualVenuesMapDetails.map(venue => ({
    id: venue.slug.current,
    name: venue.title[locale],
    position: [venue.map.latitude, venue.map.longitude] as [number, number],
    image: venue.heroImage,
    href: `/venues/${venue.slug.current}`,
  }))

  // Transform venues for search functionality
  const searchVenues = individualVenuesMapDetails.map(venue => ({
    title: venue.title,
    slug: venue.slug,
  }))

  const popupVenues = individualVenuesMapDetails.map(venue => ({
    title: venue.title,
    slug: venue.slug,
  }))

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
      <ClientMainPageContent
        mainPage={mainPage}
        locale={locale}
        typeVenue={typeVenue}
        searchVenues={searchVenues}
        venues={venues}
        popupVenues={popupVenues}
        calendlyUrls={calendlyUrls.calendlyUrls}
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

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://puntacanavenuecollection.com"
  } else {
    canonicalUrl = "https://puntacanavenuecollection.com/es"
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
      ...generateHreflangAlternates(locale, ""),
    },
  }
}
