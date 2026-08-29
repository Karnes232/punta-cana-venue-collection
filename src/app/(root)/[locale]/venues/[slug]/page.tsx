import BlockContent from "@/components/BlockContent/BlockContent"
import HeroComponentIndividualVenue from "@/components/HeroComponent/HeroComponentIndividualVenue"
import AmenitiesSection from "@/components/VenueComponents/AmenitiesSection"
import VenueSpaceInfo from "@/components/VenueComponents/VenueSpaceInfo"
import EventTypesSection from "@/components/VenueComponents/EventTypesSection"

import IndividualVenuePhotoGrid from "@/components/VenueComponents/IndividualVenuePhotoGrid"
import {
  DUPLICATE_VENUE_REDIRECTS,
  getIndividualVenuePage,
  getIndividualVenueSeo,
} from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { getTranslations } from "next-intl/server"
import BlockContentIndividualVenuePage from "@/components/BlockContent/BlockContentIndividualVenuePage"
import Location from "@/components/VenueComponents/Location"
import VenueFavoriteButton from "@/components/VenueComponents/VenueFavoriteButton"
import VenuePlanningGuide from "@/components/VenueComponents/VenuePlanningGuide"
import VenueInquirySection from "@/components/VenueComponents/VenueInquirySection"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound, permanentRedirect } from "next/navigation"
import { generateHreflangAlternates } from "@/lib/hreflang"
import { PCVC_BRAND } from "@/lib/brand"
import { getVenuePlanningProfile } from "@/lib/venueProfiles"
import type { Metadata } from "next"

type VenueLocale = "en" | "es"
const SITE_URL = "https://puntacanavenuecollection.com"

const venueUrl = (locale: VenueLocale, slug: string) =>
  `${SITE_URL}${locale === "es" ? "/es" : ""}/venues/${slug}`

const venueListingUrl = (locale: VenueLocale) =>
  `${SITE_URL}${locale === "es" ? "/es" : ""}/venues`

function portableTextToPlainText(value: unknown): string {
  if (!Array.isArray(value)) return ""

  return value
    .flatMap(block => {
      if (!block || typeof block !== "object") return []
      const children = (block as { children?: unknown[] }).children
      if (!Array.isArray(children)) return []
      return children
        .map(child =>
          child && typeof child === "object" && "text" in child
            ? String((child as { text: unknown }).text)
            : "",
        )
        .filter(Boolean)
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

const WEDDING_TERMS =
  /\b(wedding|weddings|bridal|bride|groom|ceremony|ceremonies|boda|bodas|nupcial|novia|novio|ceremonia|ceremonias)\b/gi

function isWeddingFocused(value: unknown) {
  const text =
    typeof value === "string" ? value : portableTextToPlainText(value)
  const weddingMentions = text.match(WEDDING_TERMS)?.length || 0

  return weddingMentions > 0
}

function isWeddingLabel(value: string) {
  return /\b(wedding|weddings|bridal|ceremony|ceremonies|boda|bodas|nupcial|ceremonia|ceremonias)\b/i.test(
    value,
  )
}

function orderedEventTypeNames(
  eventTypes: { title?: Partial<Record<VenueLocale, string>> }[] | undefined,
  locale: VenueLocale,
) {
  return (eventTypes || [])
    .map(eventType => eventType.title?.[locale] || eventType.title?.en)
    .filter((value): value is string => Boolean(value))
    .sort(
      (first, second) =>
        Number(isWeddingLabel(first)) - Number(isWeddingLabel(second)),
    )
}

function venueDescription(
  locale: VenueLocale,
  title: string,
  location?: string,
) {
  const place = location || "Dominican Republic"
  return locale === "es"
    ? `Evalúa ${title} en ${place} según sus espacios, capacidades, montajes, infraestructura y requisitos operativos. Punta Cana Venue Collection coordina la selección, planificación, producción y logística de eventos en República Dominicana.`
    : `Evaluate ${title} in ${place} by its spaces, capacities, layouts, infrastructure and operating requirements. Punta Cana Venue Collection coordinates venue selection, planning, production and event logistics in the Dominican Republic.`
}

function venueKeywords(locale: VenueLocale, title: string, location?: string) {
  const place =
    location ||
    (locale === "es" ? "República Dominicana" : "Dominican Republic")

  return locale === "es"
    ? [
        `${title} eventos`,
        `venue en ${place}`,
        `espacios para eventos en ${place}`,
        "planificación de eventos República Dominicana",
        "producción de eventos República Dominicana",
        "logística de eventos República Dominicana",
      ]
    : [
        `${title} events`,
        `venue in ${place}`,
        `event spaces in ${place}`,
        "event planning Dominican Republic",
        "event production Dominican Republic",
        "event logistics Dominican Republic",
      ]
}

function buildVenueStructuredData(
  pageData: NonNullable<Awaited<ReturnType<typeof getIndividualVenuePage>>>,
  locale: VenueLocale,
) {
  const title = pageData.title?.[locale] || pageData.venueName
  const currentUrl = venueUrl(locale, pageData.slug.current)
  const location = pageData.location?.location
  const contentDescription = portableTextToPlainText(
    pageData.description?.[locale],
  )
  const description =
    contentDescription && !isWeddingFocused(pageData.description?.[locale])
      ? contentDescription
      : venueDescription(locale, title, location)
  const images = [
    pageData.heroImage?.asset?.url,
    ...(pageData.gallery || []).map(image => image.asset?.url),
  ].filter((image): image is string => Boolean(image))
  const capacities = [
    pageData.capacitySeated,
    pageData.capacityCocktail,
  ].filter(
    (capacity): capacity is number =>
      typeof capacity === "number" && capacity > 0,
  )
  const maximumAttendeeCapacity =
    pageData.verifiedMaximumCapacity ||
    (capacities.length ? Math.max(...capacities) : undefined)
  const hasCoordinates =
    Number.isFinite(pageData.map?.latitude) &&
    Number.isFinite(pageData.map?.longitude)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${currentUrl}#webpage`,
        url: currentUrl,
        name: title,
        description,
        inLanguage: locale === "es" ? "es-DO" : "en",
        mainEntity: { "@id": `${currentUrl}#venue` },
        about: [
          { "@id": `${currentUrl}#venue` },
          { "@id": `${currentUrl}#planning-service` },
        ],
        publisher: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "EventVenue",
        "@id": `${currentUrl}#venue`,
        name: title,
        url: currentUrl,
        description,
        image: images,
        ...(location && {
          address: {
            "@type": "PostalAddress",
            addressLocality: location,
            addressCountry: "DO",
          },
        }),
        ...(hasCoordinates && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: pageData.map.latitude,
            longitude: pageData.map.longitude,
          },
        }),
        ...(maximumAttendeeCapacity && { maximumAttendeeCapacity }),
        ...(pageData.amenities?.length && {
          amenityFeature: pageData.amenities.map(amenity => ({
            "@type": "LocationFeatureSpecification",
            name: amenity.title?.[locale],
            value: true,
          })),
        }),
        keywords: [
          ...venueKeywords(locale, title, location),
          ...orderedEventTypeNames(pageData.eventTypes, locale),
        ],
        mainEntityOfPage: { "@id": `${currentUrl}#webpage` },
      },
      {
        "@type": "Service",
        "@id": `${currentUrl}#planning-service`,
        name:
          locale === "es"
            ? `Planificación y producción de eventos en ${title}`
            : `Event planning and production at ${title}`,
        serviceType:
          locale === "es"
            ? "Planificación, producción y operación local de eventos"
            : "Event planning, production and local operations",
        provider: { "@id": `${SITE_URL}#organization` },
        areaServed: {
          "@type": "Country",
          name: "Dominican Republic",
        },
        url: `${currentUrl}#venue-inquiry`,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: PCVC_BRAND.name,
        url: SITE_URL,
        logo: PCVC_BRAND.logo,
        email: PCVC_BRAND.email,
        telephone: `+${PCVC_BRAND.telephone}`,
        areaServed: {
          "@type": "Country",
          name: "Dominican Republic",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : "Home",
            item: `${SITE_URL}${locale === "es" ? "/es" : ""}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es" ? "Venues" : "Venues",
            item: venueListingUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: currentUrl,
          },
        ],
      },
    ],
  }
}

export default async function VenueIndividual({
  params,
}: {
  params: Promise<{
    slug: string
    locale: "en" | "es"
  }>
}) {
  const t = await getTranslations("individualVenueListing")
  const { locale, slug } = await params
  const redirectSlug = DUPLICATE_VENUE_REDIRECTS[slug]

  if (redirectSlug) {
    permanentRedirect(
      locale === "es"
        ? `/es/venues/${redirectSlug}`
        : `/venues/${redirectSlug}`,
    )
  }

  const pageData = await getIndividualVenuePage(slug)

  if (!pageData) {
    return notFound()
  }

  const planningProfile = getVenuePlanningProfile(slug)
  const structuredData = buildVenueStructuredData(pageData, locale)
  const localizedDescription = pageData.description?.[locale]
  const localizedDescription2 = pageData.description2?.[locale]
  const useCmsDescription =
    Boolean(localizedDescription) && !isWeddingFocused(localizedDescription)
  const useCmsDescription2 =
    Boolean(localizedDescription2) && !isWeddingFocused(localizedDescription2)
  const neutralDescription =
    planningProfile?.summary?.[locale] ||
    venueDescription(locale, pageData.title[locale], pageData.location.location)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      {pageData.heroImage && (
        <div className="relative">
          {pageData.heroImage && (
            <HeroComponentIndividualVenue
              heroImage={pageData.heroImage}
              heroTitle={pageData.title[locale]}
              locale={locale}
            />
          )}

          {/* Floating Favorite Button */}
          <div className="absolute top-4 right-4 z-10">
            <VenueFavoriteButton
              venueId={slug}
              venueTitle={pageData.title[locale]}
              location={pageData.location.location}
              size="large"
            />
          </div>
        </div>
      )}

      {/* Back to Venues Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-6">
        <Link
          href={locale === "en" ? "/venues" : `/${locale}/venues`}
          className="inline-flex items-center gap-2 text-charcoal hover:text-golden transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          {t("backToAllVenues")}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
        {/* Left Column - Main Content */}
        <div className="w-full lg:w-3/5 flex flex-col gap-8">
          {/* Photo Gallery */}
          {pageData.gallery && (
            <IndividualVenuePhotoGrid
              gallery={pageData.gallery}
              videoGallery={pageData.videoGallery}
              venueTitle={pageData.title[locale]}
              locale={locale}
            />
          )}

          {/* Description */}
          <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
            <h2 className="font-hero-display mb-4 text-3xl font-bold">
              {t("about")}
            </h2>
            {useCmsDescription ? (
              <BlockContent content={pageData.description} language={locale} />
            ) : (
              <div className="space-y-4 text-base leading-7 text-slate-700">
                <p>{neutralDescription}</p>
                <p>
                  {locale === "es"
                    ? "La recomendación final depende del formato, la cantidad de asistentes, el montaje, la producción técnica, los accesos y la logística requerida. Verificamos estos factores directamente con el venue antes de presentar una propuesta."
                    : "The final recommendation depends on the format, attendance, layout, technical production, access and required logistics. We verify these factors directly with the venue before presenting a proposal."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full flex flex-col lg:w-2/5 z-0 lg:mt-4 gap-6">
          <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
            <div className="bg-gradient-to-br from-ivory to-white border border-golden/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-hero-display text-xl font-semibold text-charcoal">
                    {t("saveThisVenue")}
                  </h3>
                  <p className="text-slate-600 text-sm">{t("addFavorites")}</p>
                </div>
                <VenueFavoriteButton
                  venueId={slug}
                  venueTitle={pageData.title[locale]}
                  location={pageData.location.location}
                  size="large"
                />
              </div>

              {/* Additional actions can go here */}
              <div className="flex gap-3">
                <a
                  href="#venue-inquiry"
                  className="flex-1 rounded-xl bg-gradient-to-br from-golden/50 to-golden/90 px-4 py-3 text-center text-sm font-semibold text-charcoal transition-all duration-300 hover:from-golden/70 hover:to-golden hover:shadow-md"
                >
                  {t("planEventHere")}
                </a>
              </div>
            </div>
          </div>
          {/* Map */}
          {pageData.location && (
            <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
              <Location location={pageData.location.location} />
            </div>
          )}
          {/* <div className="w-full rounded-2xl overflow-hidden h-96 lg:h-[416px] xl:h-[500px]">
            <MapSection venues={venues} />
          </div> */}

          {/* Space Information */}
          {pageData.totalSpace && !planningProfile?.facts?.length && (
            <div className="flex flex-col lg:w-full max-w-5xl mx-5 lg:p-2 lg:mx-auto">
              <VenueSpaceInfo
                totalSpace={pageData.totalSpace}
                capacityCocktail={pageData.capacityCocktail}
                capacitySeated={pageData.capacitySeated}
                locale={locale}
              />
            </div>
          )}

          {/* Event Types */}
          {pageData.eventTypes && (
            <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
              <EventTypesSection
                eventTypes={pageData.eventTypes}
                locale={locale}
              />
            </div>
          )}

          {/* Amenities */}
          <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
            <AmenitiesSection amenities={pageData.amenities} locale={locale} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 lg:px-0">
        <VenuePlanningGuide
          slug={slug}
          venueTitle={pageData.title[locale]}
          location={pageData.location.location}
          locale={locale}
          eventTypes={pageData.eventTypes}
        />
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 lg:px-0">
        <VenueInquirySection
          venueName={pageData.venueName}
          venueTitle={pageData.title[locale]}
          locale={locale}
        />
      </div>

      {useCmsDescription2 && pageData.description2 && (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
          <BlockContentIndividualVenuePage
            content={pageData.description2}
            language={locale}
          />
        </div>
      )}

      {/* Bottom Back to Venues Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-8 mb-8 text-center">
        <Link
          href={locale === "en" ? "/venues" : `/${locale}/venues`}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          {t("backToAllVenues")}
        </Link>
      </div>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string
    locale: "en" | "es"
  }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const redirectSlug = DUPLICATE_VENUE_REDIRECTS[slug]
  const effectiveSlug = redirectSlug || slug
  const [pageSeo, pageData] = await Promise.all([
    getIndividualVenueSeo(effectiveSlug),
    getIndividualVenuePage(effectiveSlug),
  ])

  if (!pageData) {
    return {
      robots: { index: false, follow: false },
    }
  }

  const seo = pageSeo?.seo
  const title = pageData.title?.[locale] || pageData.venueName
  const location = pageData.location?.location
  const canonicalUrl = venueUrl(locale, effectiveSlug)
  const fallbackTitle =
    locale === "es"
      ? `${title} | Venue para eventos en ${location || "República Dominicana"}`
      : `${title} | Event Venue in ${location || "Dominican Republic"}`
  const metaTitle = fallbackTitle
  const metaDescription = venueDescription(locale, title, location)
  const openGraphTitle = metaTitle
  const openGraphDescription = metaDescription
  const openGraphImage =
    seo?.openGraph?.image?.url || pageData.heroImage?.asset?.url
  const keywords = venueKeywords(locale, title, location)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      ...(openGraphImage && {
        images: [
          {
            url: openGraphImage,
            alt: title,
            width: seo?.openGraph?.image?.width,
            height: seo?.openGraph?.image?.height,
          },
        ],
      }),
      type: "website",
      url: canonicalUrl,
      siteName: PCVC_BRAND.name,
      locale: locale === "es" ? "es_DO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      ...(openGraphImage && { images: [openGraphImage] }),
    },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noFollow,
    },
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, `venues/${effectiveSlug}`),
    },
  }
}
