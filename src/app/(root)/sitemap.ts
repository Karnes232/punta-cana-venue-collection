import type { MetadataRoute } from "next"
import { getAllBlogPostsSlugs } from "@/sanity/queries/Blog/BlogPost"
import { getIndividualVenuesSlugs } from "@/sanity/queries/IndividualVenues/IndividualVenues"

const allBlogPostsSlugs = await getAllBlogPostsSlugs()
const blogPostsEnglishSlugs = allBlogPostsSlugs.map(slug => {
    return {
        url: `https://puntacanavenuecollection.com/blog/${slug.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
    }
})

const allBlogPostsSpanishSlugs = allBlogPostsSlugs.map(slug => {
    return {
        url: `https://puntacanavenuecollection.com/es/blog/${slug.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
    }
})

const allIndividualVenuesSlugs = await getIndividualVenuesSlugs()
const individualVenuesEnglishSlugs = allIndividualVenuesSlugs.map(slug => {
    return {
        url: `https://puntacanavenuecollection.com/venues/${slug.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
    }
})

const allIndividualVenuesSpanishSlugs = allIndividualVenuesSlugs.map(slug => {
    return {
        url: `https://puntacanavenuecollection.com/es/venues/${slug.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
    }
})
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://puntacanavenuecollection.com",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/blog",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/blog",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/venues",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/venues",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/contact",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/contact",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/inspection",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/inspection",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/privacy",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/privacy",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/cookies",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/cookies",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/add-venue",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/add-venue",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/terms",
            lastModified: new Date(),   
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://puntacanavenuecollection.com/es/terms",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...blogPostsEnglishSlugs,
        ...allBlogPostsSpanishSlugs,
        ...individualVenuesEnglishSlugs,
        ...allIndividualVenuesSpanishSlugs,
    ]
}