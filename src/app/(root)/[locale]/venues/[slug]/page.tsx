import BlockContent from "@/components/BlockContent/BlockContent"
import HeroComponentIndividualVenue from "@/components/HeroComponent/HeroComponentIndividualVenue"
import AmenitiesSection from "@/components/VenueComponents/AmenitiesSection"
import VenueSpaceInfo from "@/components/VenueComponents/VenueSpaceInfo"
import EventTypesSection from "@/components/VenueComponents/EventTypesSection"

import MapSection from "@/components/MapComponents/MapSection"
import IndividualVenuePhotoGrid from "@/components/VenueComponents/IndividualVenuePhotoGrid"
import {
  getIndividualVenuePage,
  getIndividualVenueSchema,
  getIndividualVenueSeo,
} from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { getTranslations } from "next-intl/server"
import { Cormorant_Garamond } from "next/font/google"
import BlockContentIndividualVenuePage from "@/components/BlockContent/BlockContentIndividualVenuePage"
import Location from "@/components/VenueComponents/Location"
import VenueFavoriteButton from "@/components/VenueComponents/VenueFavoriteButton"
import IndividualVenueForm from "@/components/VenueComponents/IndividualVenueForm"
import ScheduleCallButton from "@/components/VenueComponents/ScheduleCallButton"
import { getCalendlyUrls } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { generateHreflangAlternates } from "@/lib/hreflang"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default async function VenueIndividual({
  params,
}: {
  params: Promise<{
    slug: string
    locale: "en" | "es"
  }>
}) {
  const t = await getTranslations("individualVenueListing")
  const { locale, slug } = await params
  const structuredData = await getIndividualVenueSchema(slug)
  const pageData = await getIndividualVenuePage(slug)
  const calendlyUrls = await getCalendlyUrls()

  if (!pageData) {
    return notFound()
  }

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
      {pageData.heroImage && (
        <div className="relative">
          {pageData.heroImage && (
            <HeroComponentIndividualVenue
              heroImage={pageData.heroImage}
              heroTitle={pageData.title[locale]}
            />
          )}

          {/* Floating Favorite Button */}
          <div className="absolute top-4 right-4 z-10">
            <VenueFavoriteButton
              venueId={slug}
              venueTitle={pageData.title[locale]}
              location={pageData.location.location}
              size="large"
            />
          </div>
        </div>
      )}

      {/* Back to Venues Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-6">
        <Link
          href={locale === "en" ? "/venues" : `/${locale}/venues`}
          className="inline-flex items-center gap-2 text-charcoal hover:text-golden transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          {t("backToAllVenues")}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
        {/* Left Column - Main Content */}
        <div className="w-full lg:w-3/5 flex flex-col gap-8">
          {/* Photo Gallery */}
          {pageData.gallery && (
            <IndividualVenuePhotoGrid
              gallery={pageData.gallery}
              videoGallery={pageData.videoGallery}
            />
          )}

          {/* Description */}
          <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
            <h2
              className={`${coromantGaramond.className} mb-4 text-3xl font-bold`}
            >
              {t("about")}
            </h2>
            {pageData.description && (
              <BlockContent content={pageData.description} language={locale} />
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full flex flex-col lg:w-2/5 z-0 lg:mt-4 gap-6">
          <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
            <div className="bg-gradient-to-br from-ivory to-white border border-golden/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3
                    className={`${coromantGaramond.className} text-xl font-semibold text-charcoal`}
                  >
                    {t("saveThisVenue")}
                  </h3>
                  <p className="text-slate-600 text-sm">{t("addFavorites")}</p>
                </div>
                <VenueFavoriteButton
                  venueId={slug}
                  venueTitle={pageData.title[locale]}
                  location={pageData.location.location}
                  size="large"
                />
              </div>

              {/* Additional actions can go here */}
              <div className="flex gap-3">
                <IndividualVenueForm
                  venueName={pageData.venueName}
                  venueTitle={pageData.title[locale]}
                  className="flex-1 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md text-sm"
                />
                <ScheduleCallButton
                  locale={locale}
                  calendlyUrls={calendlyUrls.calendlyUrls}
                />
              </div>
            </div>
          </div>
          {/* Map */}
          {pageData.location && (
            <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
              <Location location={pageData.location.location} />
            </div>
          )}
          {/* <div className="w-full rounded-2xl overflow-hidden h-96 lg:h-[416px] xl:h-[500px]">
            <MapSection venues={venues} />
          </div> */}

          {/* Space Information */}
          {pageData.totalSpace && (
            <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
              <VenueSpaceInfo
                totalSpace={pageData.totalSpace}
                capacityCocktail={pageData.capacityCocktail}
                capacitySeated={pageData.capacitySeated}
                locale={locale}
              />
            </div>
          )}

          {/* Event Types */}
          {pageData.eventTypes && (
            <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
              <EventTypesSection
                eventTypes={pageData.eventTypes}
                locale={locale}
              />
            </div>
          )}

          {/* Amenities */}
          <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
            <AmenitiesSection amenities={pageData.amenities} locale={locale} />
          </div>
        </div>
      </div>
      {pageData.description2 && (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
          <BlockContentIndividualVenuePage
            content={pageData.description2}
            language={locale}
          />
        </div>
      )}

      {/* Bottom Back to Venues Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-8 mb-8 text-center">
        <Link
          href={locale === "en" ? "/venues" : `/${locale}/venues`}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          {t("backToAllVenues")}
        </Link>
      </div>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string
    locale: "en" | "es"
  }>
}) {
  const { locale, slug } = await params
  const pageSeo = await getIndividualVenueSeo(slug)

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://puntacanavenuecollection.com/venues/${slug}`
  } else {
    canonicalUrl = `https://puntacanavenuecollection.com/es/venues/${slug}`
  }

  return {
    title: pageSeo?.seo?.meta[locale]?.title || `Venue - ${slug}`,
    description:
      pageSeo?.seo?.meta[locale]?.description ||
      `Venue information for ${slug}`,
    keywords: pageSeo?.seo?.meta[locale]?.keywords.join(", ") || "",
    url: canonicalUrl,
    openGraph: {
      title:
        pageSeo?.seo?.openGraph[locale]?.title ||
        pageSeo?.seo?.meta[locale]?.title ||
        `Venue - ${slug}`,
      description:
        pageSeo?.seo?.openGraph[locale]?.description ||
        pageSeo?.seo?.meta[locale]?.description ||
        `Venue information for ${slug}`,
      images: pageSeo?.seo?.openGraph?.image?.url || "",
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo?.seo?.noIndex || true,
      follow: !pageSeo?.seo?.noFollow || true,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, `venues/${slug}`),
    },
  }
}
