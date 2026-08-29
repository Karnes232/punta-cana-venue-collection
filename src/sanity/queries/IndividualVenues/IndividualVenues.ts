import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"
import { applyVenueDataCorrections } from "@/lib/venueProfiles"

export const REMOVED_VENUE_SLUGS = [
  "sagrada-familia-chapel-cap-cana",
  "basilica-nuestra-senora-de-la-altagracia",
] as const

export const DUPLICATE_VENUE_REDIRECTS: Record<string, string> = {
  "dreams-macao-beach-punta-cana": "dreams-macao",
}

const excludedVenueSlugs = JSON.stringify([
  ...REMOVED_VENUE_SLUGS,
  ...Object.keys(DUPLICATE_VENUE_REDIRECTS),
])
const publicVenueFilter = `displayed == true && !(slug.current in ${excludedVenueSlugs})`

export const individualVenuesQuery = `*[_type == "individualVenue" && ${publicVenueFilter}] | order(title.en asc) {
    venueName,
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
    slug,
    location -> {
        location
    },
    type[]->{
        title {
            en,
            es
        }
    },
    capacityCocktail,
    amenities[]->{
        title {
            en,
            es
        }
    },
    startingFrom,
}`

export interface IndividualVenue {
  venueName: string
  title: {
    en: string
    es: string
  }
  heroImage: Omit<HeroImage, "alt"> & {
    alt?: string | { en?: string; es?: string }
  }
  slug: {
    current: string
  }
  location: { location: string }
  type?: {
    title: {
      en: string
      es: string
    }
  }[]
  capacityCocktail?: number
  verifiedMaximumCapacity?: number
  amenities?: {
    title: {
      en: string
      es: string
    }
  }[]
  startingFrom?: number
}

export async function getIndividualVenues(): Promise<IndividualVenue[]> {
  const data = await client.fetch<IndividualVenue[]>(individualVenuesQuery)
  return data.map(applyVenueDataCorrections)
}

export const individualVenueSeoQuery = `*[_type == "individualVenue" && slug.current == $slug && ${publicVenueFilter}][0] {
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
        canonicalUrl,
        noIndex,
        noFollow
    }
}`

export interface IndividualVenueSeo {
  seo?: {
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
    canonicalUrl: string
    noIndex: boolean
    noFollow: boolean
  }
}

export async function getIndividualVenueSeo(
  slug: string,
): Promise<IndividualVenueSeo | null> {
  const data = await client.fetch<IndividualVenueSeo | null>(
    individualVenueSeoQuery,
    { slug },
  )
  return data
}

export const individualVenueSchemaQuery = `*[_type == "individualVenue" && slug.current == $slug && ${publicVenueFilter}][0] {
  seo {
    structuredData {
            en,
            es
        }
    }
}`

export interface IndividualVenueSchema {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export async function getIndividualVenueSchema(
  slug: string,
): Promise<IndividualVenueSchema> {
  const data = await client.fetch<IndividualVenueSchema>(
    individualVenueSchemaQuery,
    { slug },
  )
  return data
}

export const individualVenuePageQuery = `*[_type == "individualVenue" && slug.current == $slug && ${publicVenueFilter}][0]
{
  venueName,
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
    gallery[] {
        asset -> {
            url,
            mimeType,
            metadata {
                dimensions {
                    width,
                    height
                }
            }
        },
        alt
    },
    videoGallery[],
    map {
        latitude,
        longitude
    },
    slug,
    location -> {
        location
    },
    type[]->{
        title {
            en,
            es
        }
    },
    description {
        _type,
        en,
        es
    },
    description2 {
        _type,
        en,
        es
    },
    capacitySeated,
    capacityCocktail,
    amenities[]->{
        title {
            en,
            es
        },
        icon
    },
    startingFrom,
    eventTypes[]->{
        title {
            en,
            es
        },
        icon
    },
    totalSpace
}
`

export interface IndividualVenuePage {
  venueName: string
  title: {
    en: string
    es: string
  }
  heroImage: Omit<HeroImage, "alt"> & {
    alt?: string | { en?: string; es?: string }
  }
  gallery: {
    asset: {
      url: string
      mimeType: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string | { en?: string; es?: string }
  }[]
  videoGallery: string[]
  map: {
    latitude: number
    longitude: number
  }
  slug: {
    current: string
  }
  location: { location: string }
  type: {
    title: {
      en: string
      es: string
    }
  }[]
  description: {
    _type: string
    en: any[]
    es: any[]
  }
  description2: {
    _type: string
    en: any[]
    es: any[]
  }
  capacitySeated: number
  capacityCocktail: number
  amenities: {
    title: {
      en: string
      es: string
    }
    icon: string
  }[]
  startingFrom: number
  eventTypes: {
    title: {
      en: string
      es: string
    }
    icon: string
  }[]
  totalSpace: number
  verifiedMaximumCapacity?: number
}

export async function getIndividualVenuePage(
  slug: string,
): Promise<IndividualVenuePage | null> {
  const data = await client.fetch<IndividualVenuePage | null>(
    individualVenuePageQuery,
    {
      slug,
    },
  )
  return data ? applyVenueDataCorrections(data) : null
}

export const individualVenuesMapDetailsQuery = `*[_type == "individualVenue" && ${publicVenueFilter}] {
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
  map {
    latitude,
    longitude
  },
  slug,
}`

export interface IndividualVenuesMapDetails {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  map: {
    latitude: number
    longitude: number
  }
  slug: {
    current: string
  }
}

export async function getIndividualVenuesMapDetails(): Promise<
  IndividualVenuesMapDetails[]
> {
  const data = await client.fetch<IndividualVenuesMapDetails[]>(
    individualVenuesMapDetailsQuery,
  )
  return data
}

export const venueSearchIndexQuery = `*[_type == "individualVenue" && ${publicVenueFilter}] {
  title {
    en,
    es
  },
  slug
}`

export type VenueSearchIndexItem = Pick<
  IndividualVenuesMapDetails,
  "title" | "slug"
>

export async function getVenueSearchIndex(): Promise<VenueSearchIndexItem[]> {
  return client.fetch<VenueSearchIndexItem[]>(venueSearchIndexQuery)
}

export const individualVenuesSlugsQuery = `*[_type == "individualVenue" && ${publicVenueFilter}] {
  slug {
    current
  }
}`

export async function getIndividualVenuesSlugs(): Promise<
  { slug: { current: string } }[]
> {
  const data = await client.fetch<{ slug: { current: string } }[]>(
    individualVenuesSlugsQuery,
  )
  return data
}
