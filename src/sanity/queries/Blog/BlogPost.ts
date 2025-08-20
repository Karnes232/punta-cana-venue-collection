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