import { capabilities,eventTypes } from "@/lib/enterprise"
import { ENTERPRISE_REDIRECTS } from "@/lib/enterpriseRedirects"
import type { MetadataRoute } from "next"
import { getAllBlogPostsSlugs } from "@/sanity/queries/Blog/BlogPost"
import { getIndividualVenuesSlugs } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { corporateIntentSlugs } from "@/lib/corporateContent"

export const revalidate = 3600

const SITE = "https://puntacanavenuecollection.com"

const CORPORATE_ROUTES: MetadataRoute.Sitemap = ["", "/es"].flatMap(prefix => [
  {
    url: `${SITE}${prefix}/corporate-venues`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  ...corporateIntentSlugs.map(slug => ({
    url: `${SITE}${prefix}/corporate-venues/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  })),
])

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: SITE,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${SITE}/es`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${SITE}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${SITE}/es/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${SITE}/venues`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${SITE}/es/venues`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${SITE}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE}/es/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE}/es/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE}/inspection`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${SITE}/es/inspection`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${SITE}/privacy`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: `${SITE}/es/privacy`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: `${SITE}/cookies`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: `${SITE}/es/cookies`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: `${SITE}/terms`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: `${SITE}/es/terms`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  ...CORPORATE_ROUTES,
]

const SANITY_FETCH_MS = 25_000

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(
      () => reject(new Error(`${label} timed out after ${ms}ms`)),
      ms,
    )
    promise
      .then(v => {
        clearTimeout(id)
        resolve(v)
      })
      .catch(e => {
        clearTimeout(id)
        reject(e)
      })
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogSlugs: { slug: { current: string } }[] = []
  let venueSlugs: { slug: { current: string } }[] = []

  try {
    ;[blogSlugs, venueSlugs] = await Promise.all([
      withTimeout(
        getAllBlogPostsSlugs(),
        SANITY_FETCH_MS,
        "getAllBlogPostsSlugs",
      ),
      withTimeout(
        getIndividualVenuesSlugs(),
        SANITY_FETCH_MS,
        "getIndividualVenuesSlugs",
      ),
    ])
  } catch (err) {
    console.error(
      "[sitemap] Sanity slug fetch failed; serving static URLs only:",
      err,
    )
    // Continue with the complete current static architecture.
  }

  const now = new Date()
  const blogEn = blogSlugs.map(s => ({
    url: `${SITE}/blog/${s.slug.current}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))
  const blogEs = blogSlugs.map(s => ({
    url: `${SITE}/es/blog/${s.slug.current}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))
  const venuesEn = venueSlugs.map(s => ({
    url: `${SITE}/venues/${s.slug.current}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))
  const venuesEs = venueSlugs.map(s => ({
    url: `${SITE}/es/venues/${s.slug.current}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const newPaths=["/what-we-do","/corporate-events","/destinations","/destinations/punta-cana","/destinations/santo-domingo","/for-agencies","/submit-rfp","/start-project",...capabilities.map(c=>"/what-we-do/"+c.slug),...eventTypes.map(e=>"/corporate-events/"+e.slug)]
  const added=["","/es"].flatMap(prefix=>newPaths.map(path=>({url:SITE+prefix+path,changeFrequency:"monthly" as const,priority:0.8,alternates:{languages:{en:SITE+path,es:SITE+"/es"+path}}})))
  return [...STATIC_ROUTES,...blogEn,...blogEs,...venuesEn,...venuesEs,...added].filter(entry=>!ENTERPRISE_REDIRECTS[new URL(entry.url).pathname.replace(/^\/es(?=\/)/,"")])
}
