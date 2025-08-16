import { client } from "@/sanity/lib/client"

interface MainPage {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  venueOfTheDay: {
    title: {
      en: string
      es: string
    }
    heroImage: HeroImage
    teaser: {
      en: string
      es: string
    }
    slug: string
    location: string
    type: string
    capacityCocktail: number
    amenities: {
      title: {
        en: string
        es: string
      }
    }
  }
}

export interface HeroImage {
  asset: {
    url: string
    metadata: {
      dimensions: {
        width: number
        height: number
      }
    }
  }
  alt: string
}

export const mainPageQuery = `*[_type == "mainPage"][0] {
    title {
        en,
        es
    },
    heroImage {
        asset -> {
            url,
            metadata {
                dimensions {
                    width,
                    height
                }
            }
        },
        alt
    },
    venueOfTheDay -> {
        title {
            en,
            es
        },
        heroImage {
            asset -> {
                url,
                metadata {
                    dimensions {
                        width,
                        height
                    }
                }
            },
            alt
        },
        teaser {
            en,
            es
        },
        slug,
        location,
        type,
        capacityCocktail,
        amenities[0]->{
            title {
                en,
                es
            }
        }

    }
}`

export async function getMainPage(): Promise<MainPage> {
  const mainPage = await client.fetch<MainPage>(mainPageQuery)
  return mainPage
}
