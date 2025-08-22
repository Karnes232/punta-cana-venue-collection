import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const aboutPageQuery = `*[_type == "aboutPage"][0] {
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

export interface AboutPage {
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

export async function getAboutPage(): Promise<AboutPage> {
    const data = await client.fetch<AboutPage>(aboutPageQuery)
    return data
}