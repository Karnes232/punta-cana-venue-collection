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
    type: {
      title: {
        en: string
        es: string
      }
    }
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
        type[0]->{
            title {
                en,
                es
            }
        },
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

export const typeVenueQuery = `*[_type == "typeVenue"] {
  title {
    en,
    es
  },
  image {
    alt,
    asset -> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  }
}`

export interface TypeVenue {
  title: {
    en: string
    es: string
  }
  image: HeroImage
}

export async function getTypeVenue(): Promise<TypeVenue[]> {
  const typeVenue = await client.fetch<TypeVenue[]>(typeVenueQuery)
  return typeVenue
}
