import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const addVenueQuery = `*[_type == "addVenue"][0] {
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
    description {
        _type,
        en,
        es
    }
}`

export interface AddVenue {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  description: {
    _type: string
    en: any[]
    es: any[]
  }
}

export async function getAddVenue(): Promise<AddVenue> {
  const addVenue = await client.fetch(addVenueQuery)
  return addVenue
}