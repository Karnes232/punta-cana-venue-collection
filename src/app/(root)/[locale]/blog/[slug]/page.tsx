import BlogPostContent from "@/components/BlogComponents/BlogPostContent"
import BlogPostHeader from "@/components/BlogComponents/BlogPostHeader"
import BlogPostContactForm from "@/components/ContactForms/BlogPostContactForm"
import { getBlogPostBySlug } from "@/sanity/queries/Blog/BlogPost"
import { getBlogSeo, getBlogSeoSchema } from "@/sanity/queries/Blog/BlogSeo"
import { getCalendlyUrls } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import { generateHreflangAlternates } from "@/lib/hreflang"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}

export default async function BlogPost({ params }: PageProps) {
  const { locale, slug } = await params

  const post = await getBlogPostBySlug(slug)
  const seoSchema = await getBlogSeoSchema(slug)
  const calendlyUrls = await getCalendlyUrls()

  return (
    <section>
      {seoSchema?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: seoSchema.seo.structuredData[locale],
          }}
        />
      )}
      <BlogPostHeader post={post} locale={locale as "en" | "es"} />

      <div
        className={`max-w-7xl mx-auto flex flex-col ${post.displayForm ? "2xl:grid 2xl:grid-cols-[1fr_24rem] 2xl:items-start gap-8" : ""}`}
      >
        <div>
          <BlogPostContent
            body={post.body}
            locale={locale as "en" | "es"}
            displayForm={post.displayForm}
          />
        </div>
        {post.displayForm && (
          <div className="2xl:sticky 2xl:top-24 h-fit">
            <BlogPostContactForm
              venueName={post.venueName}
              locale={locale as "en" | "es"}
              calendlyUrls={calendlyUrls.calendlyUrls}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}) {
  const { locale, slug } = await params
  const pageSeo = await getBlogSeo(slug)

  if (!pageSeo) {
    return {}
  }
  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://puntacanavenuecollection.com/blog/${slug}`
  } else {
    canonicalUrl = `https://puntacanavenuecollection.com/es/blog/${slug}`
  }

  if (!pageSeo.seo.openGraph) {
    return {
      title: pageSeo.seo.meta[locale].title,
      description: pageSeo.seo.meta[locale].description,
      keywords: pageSeo.seo.meta[locale].keywords.join(", "),
      url: canonicalUrl,
      openGraph: {
        title: pageSeo.seo.meta[locale].title,
        description: pageSeo.seo.meta[locale].description,
        images: "",
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
        ...generateHreflangAlternates(locale, `blog/${slug}`),
      },
    }
  } else {
    return {
      title: pageSeo.seo.meta[locale].title,
      description: pageSeo.seo.meta[locale].description,
      keywords: pageSeo.seo.meta[locale].keywords.join(", "),
      url: canonicalUrl,
      openGraph: {
        title: pageSeo.seo.openGraph[locale].title,
        description: pageSeo.seo.openGraph[locale].description,
        images: pageSeo.seo.openGraph.image.url || "",
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
        ...generateHreflangAlternates(locale, `blog/${slug}`),
      },
    }
  }
}
