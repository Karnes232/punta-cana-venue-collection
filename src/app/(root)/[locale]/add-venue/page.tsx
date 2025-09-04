import BlockContent from "@/components/BlockContent/BlockContent"
import AddVenueForm from "@/components/ContactForms/AddVenueForm"
import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import { getAddVenue } from "@/sanity/queries/AddVenue/AddVenue"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function AddVenue({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("add-venue")
  const addVenue = await getAddVenue()

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
        heroImage={addVenue.heroImage}
        heroTitle={addVenue.title[locale]}
      />
      <div className="max-w-7xl mx-auto flex flex-col gap-8 mt-5">
        {addVenue.description && (
          <div className="mx-5">
            <BlockContent
              content={addVenue.description}
              language={locale as "en" | "es"}
            />
          </div>
        )}
        <AddVenueForm />
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
  const pageSeo = await getPageSeo("add-venue")

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://puntacanavenuecollection.com/add-venue"
  } else {
    canonicalUrl = "https://puntacanavenuecollection.com/es/add-venue"
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
