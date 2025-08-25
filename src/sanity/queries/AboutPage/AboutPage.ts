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
    },
    paragraph2 {
        _type,
        en,
        es
    },
    aboutCards[]->{
        title {
            en,
            es
        },
        description {
            _type,
            en,
            es
        },
        icon
    },
    flatRateText {
        en,
        es
    },
    flatRate,
    flatRateButtonText {
        en,
        es
    },
    ClientAdvantages[]
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
  paragraph2: {
    _type: string
    en: any[]
    es: any[]
  }
  aboutCards: {
    title: {
      en: string
      es: string
    }
    description: {
      _type: string
      en: any[]
      es: any[]
    }
    icon: string
  }[]
  flatRateText: {
    en: string
    es: string
  }
  flatRate: number
  flatRateButtonText: {
    en: string
    es: string
  }
  ClientAdvantages: {
    en: string
    es: string
  }[]
}

export async function getAboutPage(): Promise<AboutPage> {
  const data = await client.fetch<AboutPage>(aboutPageQuery)
  return data
}
