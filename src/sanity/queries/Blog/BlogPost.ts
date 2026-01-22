import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"
import { BlogCategory } from "./BlogCategory"

export interface BlogPostMainPage {
  _id: string
  title: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  readTime: number
  featured: boolean
  tags: {
    en: string[]
    es: string[]
  }
  slug: {
    current: string
  }
  categories: BlogCategory[]
  venueName: string
  mainImage: HeroImage
  publishedAt: string
}

export const allBlogPostsQuery = `*[_type == "blogPost"] {
    _id,
    title {
        en,
        es
    },
    description {
        en,
        es
    },
    tags{
        en,
        es
    },
    readTime,
    featured,
    tags {
        en,
        es
    },
    slug {
        current
    },
    categories[]-> {
        title {
            en,
            es
        }
    },
    publishedAt,
    venueName,
    mainImage {
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

export async function getAllBlogPosts(): Promise<BlogPostMainPage[]> {
  const data = await client.fetch<BlogPostMainPage[]>(allBlogPostsQuery)
  return data
}

export interface BlogPost {
  _id: string
  title: {
    en: string
    es: string
  }
  displayForm: boolean
  description: {
    en: string
    es: string
  }
  tags: {
    en: string[]
    es: string[]
  }
  readTime: number
  featured: boolean
  slug: {
    current: string
  }
  categoryIds?: string[]
  categories: BlogCategory[]
  venueName: string
  mainImage: HeroImage
  publishedAt: string
  body: {
    en: string
    es: string
  }
}

export const getBlogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title {
        en,
        es
    },
    displayForm,
    description {
        en,
        es
    },
    tags{
        en,
        es
    },
    readTime,
    featured,
    tags {
        en,
        es
    },
    slug {
        current
    },
    "categoryIds": categories[]._ref,
    categories[]-> {
        _id,
        title {
            en,
            es
        }
    },
    publishedAt,
    venueName,
    mainImage {
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
    body {
        en,
        es
    }

}`

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const data = await client.fetch<BlogPost>(getBlogPostBySlugQuery, { slug })
  return data
}

export const allBlogPostsSlugsQuery = `*[_type == "blogPost"] {
    slug {
        current
    }
}`

export async function getAllBlogPostsSlugs(): Promise<
  { slug: { current: string } }[]
> {
  const data = await client.fetch<{ slug: { current: string } }[]>(
    allBlogPostsSlugsQuery,
  )
  return data
}

export const getRelatedBlogPostsQuery = `*[_type == "blogPost" && slug.current != $currentSlug && count((categories[]._ref)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...$limit] {
    _id,
    title {
        en,
        es
    },
    description {
        en,
        es
    },
    tags{
        en,
        es
    },
    readTime,
    featured,
    slug {
        current
    },
    categories[]-> {
        title {
            en,
            es
        }
    },
    publishedAt,
    venueName,
    mainImage {
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

export async function getRelatedBlogPosts(
  categoryIds: string[],
  currentSlug: string,
  limit: number = 3,
): Promise<BlogPostMainPage[]> {
  if (!categoryIds || categoryIds.length === 0) {
    return []
  }
  const data = await client.fetch<BlogPostMainPage[]>(
    getRelatedBlogPostsQuery,
    {
      categoryIds,
      currentSlug,
      limit,
    },
  )
  return data
}
