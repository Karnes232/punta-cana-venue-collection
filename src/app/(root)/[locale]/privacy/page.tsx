import { getLegalDocuments } from "@/sanity/queries/LegalDocuments/LegalDocuments"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import BlockContent from "@/components/BlockContent/BlockContent"

export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("privacy-policy")
  const legalDocuments = await getLegalDocuments("privacy-policy")

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
        <div className="container px-5 max-w-7xl lg:px-0 lg:mx-auto">
          <BlockContent content={legalDocuments.body} language={locale} />
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
  const pageSeo = await getPageSeo("privacy-policy")

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://puntacanavenuecollection.com/privacy"
  } else {
    canonicalUrl = "https://puntacanavenuecollection.com/es/privacy"
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
