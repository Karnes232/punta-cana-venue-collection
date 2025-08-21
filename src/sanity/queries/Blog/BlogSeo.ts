import { client } from "@/sanity/lib/client"

export const blogSeoQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
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

export interface BlogSeo {
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

export async function getBlogSeo(slug: string): Promise<BlogSeo> {
  const data = await client.fetch<BlogSeo>(blogSeoQuery, { slug })
  return data
}

export const blogSeoSchemaQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
     seo {
        structuredData {
            en,
            es
        }
    }
  }`

export interface BlogSeoSchema {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export async function getBlogSeoSchema(slug: string): Promise<BlogSeoSchema> {
  const data = await client.fetch<BlogSeoSchema>(blogSeoSchemaQuery, { slug })
  return data
}
