import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const blogHeaderQuery = `*[_type == "blogHeader"][0] {
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

export interface BlogHeader {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
}

export async function getBlogHeader(): Promise<BlogHeader> {
  const data = await client.fetch<BlogHeader>(blogHeaderQuery)
  return data
}
