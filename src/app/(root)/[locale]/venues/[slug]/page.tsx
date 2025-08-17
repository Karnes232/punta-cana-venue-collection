import BlockContent from "@/components/BlockContent/BlockContent"
import HeroComponentIndividualVenue from "@/components/HeroComponent/HeroComponentIndividualVenue"
import IndividualVenuePhotoGrid from "@/components/VenueComponents/IndividualVenuePhotoGrid"
import {
  getIndividualVenuePage,
  getIndividualVenueSchema,
  getIndividualVenueSeo,
} from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { getTranslations } from "next-intl/server"
import { Cormorant_Garamond } from "next/font/google"

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
  console.log(pageData.description[locale])
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
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 mt-5">
        <div className="w-full lg:w-3/5 flex flex-col-reverse lg:flex-col gap-4">
          <IndividualVenuePhotoGrid gallery={pageData.gallery} />
          <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto mt-5 ">
            <h2
              className={`${coromantGaramond.className} mb-2 text-3xl font-bold`}
            >
              {t("about")}
            </h2>
            <BlockContent content={pageData.description} language={locale} />
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          {/* <p>{pageData.description[locale]}</p> */}
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
