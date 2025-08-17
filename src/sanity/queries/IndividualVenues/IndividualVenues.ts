import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const individualVenuesQuery = `*[_type == "individualVenue"] {
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
    slug,
    location,
    type[]->{
        title {
            en,
            es
        }
    },
    capacityCocktail,
    amenities[]->{
        title {
            en,
            es
        }
    },
    startingFrom,
}`

export interface IndividualVenue {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  slug: {
    current: string
  }
  location: string
  type: {
    title: {
      en: string
      es: string
    }
  }[]
  capacityCocktail: number
  amenities: {
    title: {
      en: string
      es: string
    }
  }[]
  startingFrom: number
}

export async function getIndividualVenues(): Promise<IndividualVenue[]> {
  const data = await client.fetch<IndividualVenue[]>(individualVenuesQuery)
  return data
}
