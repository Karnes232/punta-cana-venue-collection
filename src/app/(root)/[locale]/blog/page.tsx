import HeroComponentBlog from "@/components/HeroComponent/HeroComponentBlog"
import { getBlogCategories } from "@/sanity/queries/Blog/BlogCategory"
import { getBlogHeader } from "@/sanity/queries/Blog/BlogHeader"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("blog")
  const blogHeader = await getBlogHeader()
  const blogCategories = await getBlogCategories()
  console.log(blogCategories)
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
      <HeroComponentBlog heroImage={blogHeader.heroImage} heroTitle={blogHeader.title[locale]} />
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
  const pageSeo = await getPageSeo("blog")

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.venues.com/blog"
  } else {
    canonicalUrl = "https://www.venues.com/es/blog"
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
