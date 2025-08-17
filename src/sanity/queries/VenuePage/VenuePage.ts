import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const venuePageQuery = `*[_type == "venuePage"][0] {
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
    }
}`

export interface VenuePage {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
}

export async function getVenuePage(): Promise<VenuePage> {
  const data = await client.fetch<VenuePage>(venuePageQuery)
  return data
}
