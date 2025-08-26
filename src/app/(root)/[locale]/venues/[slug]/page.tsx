// import BlockContent from "@/components/BlockContent/BlockContent"
// import HeroComponentIndividualVenue from "@/components/HeroComponent/HeroComponentIndividualVenue"
// import AmenitiesSection from "@/components/VenueComponents/AmenitiesSection"
// import VenueSpaceInfo from "@/components/VenueComponents/VenueSpaceInfo"
// import EventTypesSection from "@/components/VenueComponents/EventTypesSection"
// // import ReviewsSection from "@/components/VenueComponents/ReviewsSection"
// import MapSection from "@/components/MapComponents/MapSection"
// import IndividualVenuePhotoGrid from "@/components/VenueComponents/IndividualVenuePhotoGrid"
// import {
//   getIndividualVenuePage,
//   getIndividualVenueSchema,
//   getIndividualVenueSeo,
// } from "@/sanity/queries/IndividualVenues/IndividualVenues"
// import { getTranslations } from "next-intl/server"
// import { Cormorant_Garamond } from "next/font/google"

// const coromantGaramond = Cormorant_Garamond({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// })

// export default async function VenueIndividual({
//   params,
// }: {
//   params: Promise<{
//     slug: string
//     locale: "en" | "es"
//   }>
// }) {
//   const t = await getTranslations("individualVenueListing")
//   const { locale, slug } = await params
//   const structuredData = await getIndividualVenueSchema(slug)
//   const pageData = await getIndividualVenuePage(slug)
//   console.log(pageData)
//   const venues = [
//     {
//       id: "1",
//       name: pageData.title[locale],
//       position: [pageData.map.latitude, pageData.map.longitude] as [
//         number,
//         number,
//       ],
//       image: pageData.heroImage,
//     },
//   ]

//   return (
//     <>
//       {structuredData?.seo?.structuredData[locale] && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: structuredData.seo.structuredData[locale],
//           }}
//         />
//       )}
//       <HeroComponentIndividualVenue
//         heroImage={pageData.heroImage}
//         heroTitle={pageData.title[locale]}
//       />

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
//         {/* Left Column - Main Content */}
//         <div className="w-full lg:w-3/5 flex flex-col gap-8">
//           {/* Photo Gallery */}
//           <IndividualVenuePhotoGrid gallery={pageData.gallery} />

//           {/* Description */}
//           <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
//             <h2 className={`${coromantGaramond.className} mb-4 text-3xl font-bold`}>
//               {t("about")}
//             </h2>
//             <BlockContent content={pageData.description} language={locale} />
//           </div>

//           {/* Event Types - Full width in left column */}
//           {pageData.eventTypes && (
//             <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
//               <EventTypesSection eventTypes={pageData.eventTypes} locale={locale} />
//             </div>
//           )}

//           {/* Reviews Section - Full width in left column */}
//           {/* {pageData.reviews && pageData.reviews.length > 0 && (
//             <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
//               <ReviewsSection
//                 reviews={pageData.reviews}
//                 averageRating={pageData.averageRating || 0}
//                 totalReviews={pageData.reviews.length}
//                 locale={locale}
//               />
//             </div>
//           )} */}
//         </div>

//         {/* Right Column - Sidebar */}
//         <div className="w-full flex flex-col lg:w-2/5 z-0 lg:mt-4 gap-6">
//           {/* Map */}
//           <div className="w-full rounded-2xl overflow-hidden h-96 lg:h-[416px] xl:h-[500px]">
//             <MapSection venues={venues} />
//           </div>

//           {/* Space Information */}
//           {pageData.totalSpace && (
//             <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
//               <VenueSpaceInfo  totalSpace={pageData.totalSpace} capacityCocktail={pageData.capacityCocktail} capacitySeated={pageData.capacitySeated} locale={locale} />
//             </div>
//           )}

//           {/* Amenities */}
//           <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
//             <AmenitiesSection amenities={pageData.amenities} locale={locale} />
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{
//     slug: string
//     locale: "en" | "es"
//   }>
// }) {
//   const { locale, slug } = await params
//   const pageSeo = await getIndividualVenueSeo(slug)

//   if (!pageSeo) {
//     return {}
//   }
//   let canonicalUrl
//   if (locale === "en") {
//     canonicalUrl = `https://www.venues.com/venues/${slug}`
//   } else {
//     canonicalUrl = `https://www.venues.com/es/venues/${slug}`
//   }

//   return {
//     title: pageSeo?.seo?.meta[locale]?.title || `Venue - ${slug}`,
//     description:
//       pageSeo?.seo?.meta[locale]?.description ||
//       `Venue information for ${slug}`,
//     keywords: pageSeo?.seo?.meta[locale]?.keywords.join(", ") || "",
//     url: canonicalUrl,
//     openGraph: {
//       title:
//         pageSeo?.seo?.openGraph[locale]?.title ||
//         pageSeo?.seo?.meta[locale]?.title ||
//         `Venue - ${slug}`,
//       description:
//         pageSeo?.seo?.openGraph[locale]?.description ||
//         pageSeo?.seo?.meta[locale]?.description ||
//         `Venue information for ${slug}`,
//       images: pageSeo?.seo?.openGraph?.image?.url || "",
//       type: "website",
//       url: canonicalUrl,
//     },
//     robots: {
//       index: !pageSeo?.seo?.noIndex || true,
//       follow: !pageSeo?.seo?.noFollow || true,
//     },
//     ...(canonicalUrl && { canonical: canonicalUrl }),
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   }
// }

import BlockContent from "@/components/BlockContent/BlockContent"
import HeroComponentIndividualVenue from "@/components/HeroComponent/HeroComponentIndividualVenue"
import AmenitiesSection from "@/components/VenueComponents/AmenitiesSection"
import VenueSpaceInfo from "@/components/VenueComponents/VenueSpaceInfo"
import EventTypesSection from "@/components/VenueComponents/EventTypesSection"
// import ReviewsSection from "@/components/VenueComponents/ReviewsSection"
import MapSection from "@/components/MapComponents/MapSection"
import IndividualVenuePhotoGrid from "@/components/VenueComponents/IndividualVenuePhotoGrid"
import {
  getIndividualVenuePage,
  getIndividualVenueSchema,
  getIndividualVenueSeo,
} from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { getTranslations } from "next-intl/server"
import { Cormorant_Garamond } from "next/font/google"
import ReviewComponent from "@/components/ReviewComponents/ReviewComponent"

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

  const venues = [
    {
      id: "1",
      name: pageData.title[locale],
      position: [pageData.map.latitude, pageData.map.longitude] as [
        number,
        number,
      ],
      image: pageData.heroImage,
    },
  ]

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
      <HeroComponentIndividualVenue
        heroImage={pageData.heroImage}
        heroTitle={pageData.title[locale]}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
        {/* Left Column - Main Content */}
        <div className="w-full lg:w-3/5 flex flex-col gap-8">
          {/* Photo Gallery */}
          <IndividualVenuePhotoGrid gallery={pageData.gallery} />

          {/* Description */}
          <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
            <h2
              className={`${coromantGaramond.className} mb-4 text-3xl font-bold`}
            >
              {t("about")}
            </h2>
            <BlockContent content={pageData.description} language={locale} />
          </div>
          <ReviewComponent
            page={pageData.slug.current}
            pageName={pageData.title[locale]}
          />

          {/* Reviews Section - Full width in left column */}
          {/* {pageData.reviews && pageData.reviews.length > 0 && (
            <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
              <ReviewsSection 
                reviews={pageData.reviews}
                averageRating={pageData.averageRating || 0}
                totalReviews={pageData.reviews.length}
                locale={locale}
              />
            </div>
          )} */}
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full flex flex-col lg:w-2/5 z-0 lg:mt-4 gap-6">
          {/* Map */}
          <div className="w-full rounded-2xl overflow-hidden h-96 lg:h-[416px] xl:h-[500px]">
            <MapSection venues={venues} />
          </div>

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
    canonicalUrl = `https://www.venues.com/venues/${slug}`
  } else {
    canonicalUrl = `https://www.venues.com/es/venues/${slug}`
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
    },
  }
}
