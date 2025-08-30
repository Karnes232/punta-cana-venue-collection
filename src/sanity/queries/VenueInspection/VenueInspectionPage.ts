import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const venueInspectionPageQuery = `*[_type == "venueInspectionPage"][0] {
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
    servicesTitle {
        en,
        es
    },
    servicesDescription {
        en,
        es
    },
    servicesItems[] {
        title {
            en,
            es
        },
        description {
            en,
            es
        }
    }
}`

interface VenueInspectionPage {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  servicesTitle: {
    en: string
    es: string
  }
  servicesDescription: {
    en: string
    es: string
  }
  servicesItems: {
    title: {
      en: string
      es: string
    }
    description: {
      en: string
      es: string
    }
  }[]
}

export async function getVenueInspectionPage(): Promise<VenueInspectionPage> {
  const data = await client.fetch<VenueInspectionPage>(venueInspectionPageQuery)
  return data
}
