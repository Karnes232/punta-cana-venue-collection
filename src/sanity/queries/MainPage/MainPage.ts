import { client } from "@/sanity/lib/client"

interface MainPage {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
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
    }
}`

export async function getMainPage(): Promise<MainPage> {
  const mainPage = await client.fetch<MainPage>(mainPageQuery)
  return mainPage
}
