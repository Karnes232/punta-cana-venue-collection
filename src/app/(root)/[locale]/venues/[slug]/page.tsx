import { getPageSeo } from "@/sanity/queries/SEO/seo"

export default function VenueIndividual() {
  return <div className="min-h-screen">Venue Individual</div>
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
  const pageSeo = await getPageSeo("venueIndividual")

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
