import AboutCard from "@/components/AboutPageComponents/AboutCard"
import BlockContent from "@/components/BlockContent/BlockContent"
import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import { getAboutPage } from "@/sanity/queries/AboutPage/AboutPage"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function About({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("about")
  const aboutPage = await getAboutPage()
  console.log(aboutPage)
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
        heroImage={aboutPage.heroImage}
        heroTitle={aboutPage.title[locale]}
      />
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className='mx-5'>
          <BlockContent content={aboutPage.paragraph1} language={locale as "en" | "es"} />
        </div>
        <div className='flex flex-col md:flex-row gap-4 xl:gap-0 xl:justify-between xl:w-full max-w-5xl mx-auto'>
          {aboutPage.aboutCards.map((card) => (
            <AboutCard key={card.title[locale]} title={card.title[locale]} description={card.description} icon={card.icon} locale={locale}/>
          ))}
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
  const pageSeo = await getPageSeo("about")

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.venues.com/about"
  } else {
    canonicalUrl = "https://www.venues.com/es/about"
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
