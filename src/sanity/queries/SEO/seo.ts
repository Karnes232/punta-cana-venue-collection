import { client } from "@/sanity/lib/client"

interface PageSeo {
  pageName: string
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    canonicalUrl?: string
    noIndex: boolean
    noFollow: boolean
  }
}
export const seoQuery = `*[_type == "pageSeo" && pageName == $pageName][0] {
    pageName,
    seo {
        meta {
    en {
      title,
      description,
      keywords
    },
    es {
      title,
      description,
      keywords
    }
  },
  // Open Graph data
  openGraph {
    en {
      title,
      description
    },
    es {
      title,
      description
    },
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  canonicalUrl,
  noIndex,
  noFollow
    }
}`

export async function getPageSeo(pageName: string): Promise<PageSeo> {
  const pageSeo = await client.fetch(seoQuery, { pageName })
  return pageSeo
}

export const structuredDataQuery = `*[_type == "pageSeo" && pageName == $pageName][0] {
    pageName,
    seo {
        structuredData {
            en,
            es
        }
    }
}`

export interface structuredData {
  pageName: string
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export const getStructuredData = async (
  pageName: string,
): Promise<structuredData> => {
  const structuredData = await client.fetch(structuredDataQuery, { pageName })
  return structuredData
}
