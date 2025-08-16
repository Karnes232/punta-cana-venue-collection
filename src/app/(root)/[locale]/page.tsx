import Image from "next/image"
import { getMainPage } from "@/sanity/queries/MainPage/MainPage"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import { getPageSeo } from "@/sanity/queries/SEO/seo"
import VenueOfDay from "@/components/VenueComponents/VenueOfDay"
import { getTypeVenue } from "@/sanity/queries/MainPage/MainPage"
import TypeVenue from "@/components/VenueComponents/TypeVenue"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  const mainPage = await getMainPage()
  const typeVenue = await getTypeVenue()

  return (
    <section className="">
      <HeroComponent
        heroImage={mainPage.heroImage}
        heroTitle={mainPage.title[locale]}
      />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <VenueOfDay venueOfTheDay={mainPage.venueOfTheDay} locale={locale} />
        </div>

        <div className="lg:w-1/2">
          <TypeVenue typeVenue={typeVenue} locale={locale} />
        </div>
      </div>
    </section>
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
  const pageSeo = await getPageSeo("home")

  if (!pageSeo) {
    return {}
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: pageSeo.seo.canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: pageSeo.seo.canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(pageSeo.seo.canonicalUrl && { canonical: pageSeo.seo.canonicalUrl }),
    alternates: {
      canonical: pageSeo.seo.canonicalUrl,
    },
  }
}
