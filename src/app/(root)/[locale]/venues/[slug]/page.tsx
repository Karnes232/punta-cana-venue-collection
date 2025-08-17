import {
  getIndividualVenueSchema,
  getIndividualVenueSeo,
} from "@/sanity/queries/IndividualVenues/IndividualVenues"

export default async function VenueIndividual({
  params,
}: {
  params: Promise<{
    slug: string
    locale: "en" | "es"
  }>
}) {
  const { locale, slug } = await params
  const structuredData = await getIndividualVenueSchema(slug)

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
      <div className="min-h-screen">Venue Individual</div>
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
  console.log(pageSeo)
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
