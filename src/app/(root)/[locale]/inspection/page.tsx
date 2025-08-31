import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import ServiceDescription from "@/components/VenueInspectionComponents/ServiceDescription"
import Header from "@/components/VenueInspectionComponents/Header"
import FavoritesList from "@/components/VenueInspectionComponents/FavoritesList"
import InspectionForm from "@/components/VenueInspectionComponents/InspectionForm"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getVenueInspectionPage } from "@/sanity/queries/VenueInspection/VenueInspectionPage"
import { getCalendlyUrls } from "@/sanity/queries/GeneralLayout/GeneralLayout"

export default async function Inspection({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("inspection")
  const venueInspectionPage = await getVenueInspectionPage()
  const calendlyUrls = await getCalendlyUrls()
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
      <HeroComponentBlog
        heroImage={venueInspectionPage.heroImage}
        heroTitle={venueInspectionPage.title[locale]}
      />
      <Header />
      <div className="min-h-screen bg-ivory">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-8">
              <ServiceDescription
                servicesTitle={venueInspectionPage.servicesTitle[locale]}
                servicesDescription={
                  venueInspectionPage.servicesDescription[locale]
                }
                servicesItems={venueInspectionPage.servicesItems}
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
          <InspectionForm locale={locale} calendlyUrls={calendlyUrls.calendlyUrls} />
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
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("inspection")

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.venues.com/inspection"
  } else {
    canonicalUrl = "https://www.venues.com/es/inspection"
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
