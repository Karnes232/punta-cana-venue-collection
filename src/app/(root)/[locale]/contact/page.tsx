import BlockContent from "@/components/BlockContent/BlockContent"
import ContactPageForm from "@/components/ContactForms/ContactPageForm"
import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import { getContactPage } from "@/sanity/queries/ContactPage/ContactPage"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("contact")
  const contactPage = await getContactPage()

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
        heroImage={contactPage.heroImage}
        heroTitle={contactPage.title[locale]}
      />
      <div className="max-w-7xl mx-auto flex flex-col gap-8 mt-5">
        {contactPage.paragraph1 && (
          <div className="mx-5">
            <BlockContent
              content={contactPage.paragraph1}
              language={locale as "en" | "es"}
            />
          </div>
        )}
        <ContactPageForm />
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
  const pageSeo = await getPageSeo("contact")

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.venues.com/contact"
  } else {
    canonicalUrl = "https://www.venues.com/es/contact"
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
