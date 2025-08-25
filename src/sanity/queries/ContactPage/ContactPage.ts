import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const contactPageQuery = `*[_type == "contactPage"][0] {
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
     paragraph1 {
        _type,
        en,
        es
    }
}`

export interface ContactPage {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  paragraph1: {
    _type: string
    en: any[]
    es: any[]
  }
}

export async function getContactPage(): Promise<ContactPage> {
  const page = await client.fetch(contactPageQuery)
  return page
}
