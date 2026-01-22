"use client"
import React from "react"
import dynamic from "next/dynamic"
import { Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import VenueFavoriteButton from "@/components/VenueComponents/VenueFavoriteButton"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Dynamically import components to improve initial page load
const BlockContent = dynamic(
  () => import("@/components/BlockContent/BlockContent"),
  {
    loading: () => (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

const IndividualVenuePhotoGrid = dynamic(
  () => import("@/components/VenueComponents/IndividualVenuePhotoGrid"),
  {
    loading: () => (
      <div className="w-full h-96 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

const AmenitiesSection = dynamic(
  () => import("@/components/VenueComponents/AmenitiesSection"),
  {
    loading: () => (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

const VenueSpaceInfo = dynamic(
  () => import("@/components/VenueComponents/VenueSpaceInfo"),
  {
    loading: () => (
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

const EventTypesSection = dynamic(
  () => import("@/components/VenueComponents/EventTypesSection"),
  {
    loading: () => (
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

const Location = dynamic(
  () => import("@/components/VenueComponents/Location"),
  {
    loading: () => (
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

const IndividualVenueForm = dynamic(
  () => import("@/components/VenueComponents/IndividualVenueForm"),
  {
    loading: () => (
      <div className="w-full h-12 bg-gray-200 animate-pulse rounded-xl" />
    ),
  },
)

const ScheduleCallButton = dynamic(
  () => import("@/components/VenueComponents/ScheduleCallButton"),
  {
    loading: () => (
      <div className="w-full h-12 bg-gray-200 animate-pulse rounded-xl" />
    ),
  },
)

const BlockContentIndividualVenuePage = dynamic(
  () => import("@/components/BlockContent/BlockContentIndividualVenuePage"),
  {
    loading: () => (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

interface IndividualVenueContentProps {
  pageData: any
  slug: string
  locale: "en" | "es"
  calendlyUrls: any
  t: any
}

export default function IndividualVenueContent({
  pageData,
  slug,
  locale,
  calendlyUrls,
  t,
}: IndividualVenueContentProps) {
  return (
    <>
      {/* Back to Venues Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-6">
        <Link
          href={`/${locale}/venues`}
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
          href={`/${locale}/venues`}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          {t("backToAllVenues")}
        </Link>
      </div>
    </>
  )
}
