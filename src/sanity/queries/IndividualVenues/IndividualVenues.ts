import { client } from "@/sanity/lib/client"
import { HeroImage } from "../MainPage/MainPage"

export const individualVenuesQuery = `*[_type == "individualVenue"] {
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
    location,
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
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  slug: {
    current: string
  }
  location: string
  type: {
    title: {
      en: string
      es: string
    }
  }[]
  capacityCocktail: number
  amenities: {
    title: {
      en: string
      es: string
    }
  }[]
  startingFrom: number
}

export async function getIndividualVenues(): Promise<IndividualVenue[]> {
  const data = await client.fetch<IndividualVenue[]>(individualVenuesQuery)
  return data
}

export const individualVenueSeoQuery = `*[_type == "individualVenue" && slug.current == $slug][0] {
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
    canonicalUrl: string
    noIndex: boolean
    noFollow: boolean
  }
}

export async function getIndividualVenueSeo(
  slug: string,
): Promise<IndividualVenueSeo> {
  const data = await client.fetch<IndividualVenueSeo>(individualVenueSeoQuery, {
    slug,
  })
  return data
}

export const individualVenueSchemaQuery = `*[_type == "individualVenue" && slug.current == $slug][0] {
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

export const individualVenuePageQuery = `*[_type == "individualVenue" && slug.current == $slug][0]
{
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
    location,
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
    capacitySeated,
    capacityCocktail,
    amenities[]->{
        title {
            en,
            es
        }
    },
    startingFrom,
}
`

export interface IndividualVenuePage {
  title: {
    en: string
    es: string
  }
  heroImage: HeroImage
  gallery: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
  map: {
    latitude: number
    longitude: number
  }
  slug: string
  location: string
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
  capacitySeated: number
  capacityCocktail: number
  amenities: {
    title: {
      en: string
      es: string
    }
  }[]
  startingFrom: number
}

export async function getIndividualVenuePage(
  slug: string,
): Promise<IndividualVenuePage> {
  const data = await client.fetch<IndividualVenuePage>(
    individualVenuePageQuery,
    {
      slug,
    },
  )
  return data
}
