import { client } from "@/sanity/lib/client"

export const blogCategoryQuery = `*[_type == "blogCategory"] {
    title {
        en,
        es
    }
}`

export interface BlogCategory {
    title: {
        en: string
        es: string
    }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
    const data = await client.fetch<BlogCategory[]>(blogCategoryQuery)
    return data
}