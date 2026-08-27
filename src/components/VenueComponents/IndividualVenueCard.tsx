"use client"

import { IndividualVenue } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { MapPin, MessageCircle, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { useFavorites } from "@/customHooks/useFavoritesHook"
import { PCVC_BRAND } from "@/lib/brand"
import IndividualVenueForm from "./IndividualVenueForm"

type VenueWithStringLocation = Omit<IndividualVenue, "location"> & {
  location: string
}

function getLocalizedText(
  value: string | { en?: string; es?: string } | undefined,
  locale: string,
  fallback: string,
) {
  if (typeof value === "string") return value
  return value?.[locale as "en" | "es"] || value?.en || fallback
}

const IndividualVenueCard = ({
  venue,
  locale,
}: {
  venue: VenueWithStringLocation
  locale: string
}) => {
  const {
    venueName,
    title,
    heroImage,
    slug,
    location,
    type = [],
    capacityCocktail,
    amenities = [],
  } = venue
  const t = useTranslations("venueListing")
  const {
    isFavorited,
    toggleFavorite,
    isAtMaxCapacity,
    remainingSlots,
    error,
    clearError,
  } = useFavorites()
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const localizedTitle =
    title?.[locale as "en" | "es"] || title?.en || venueName
  const localizedTypes = type
    .map(item => item?.title?.[locale as "en" | "es"] || item?.title?.en)
    .filter(Boolean)
    .slice(0, 2) as string[]
  const displayAmenities = amenities.slice(0, 2)
  const detailsHref = `${locale === "es" ? "/es" : ""}/venues/${slug.current}`
  const whatsappText =
    locale === "es"
      ? `Hola, quiero realizar un evento en ${localizedTitle}. Necesito asistencia con el venue y la operación.`
      : `Hello, I want to hold an event at ${localizedTitle}. I need assistance with the venue and local operations.`
  const whatsappHref = `https://wa.me/${PCVC_BRAND.telephone}?text=${encodeURIComponent(whatsappText)}`
  const isFavoritedStatus = isFavorited(slug.current)

  const handleStarClick = async () => {
    clearError()
    setShowError(false)

    if (!isFavoritedStatus && isAtMaxCapacity) {
      setShowError(true)
      window.setTimeout(() => setShowError(false), 4000)
      return
    }

    setIsLoading(true)
    try {
      await toggleFavorite(slug.current, localizedTitle, location, venueName)
    } catch {
      setShowError(true)
      window.setTimeout(() => setShowError(false), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Link
          href={detailsHref}
          aria-label={`${t("viewDetails")}: ${localizedTitle}`}
        >
          {heroImage?.asset?.url ? (
            <Image
              src={heroImage.asset.url}
              alt={getLocalizedText(heroImage.alt, locale, localizedTitle)}
              fill
              sizes="(min-width: 1280px) 31vw, (min-width: 640px) 46vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              loading="lazy"
              quality={70}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
        </Link>

        {localizedTypes.length > 0 && (
          <div className="pointer-events-none absolute bottom-4 left-4 flex max-w-[75%] flex-wrap gap-2">
            {localizedTypes.map(typeName => (
              <span
                key={typeName}
                className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur"
              >
                {typeName}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleStarClick}
          disabled={isLoading}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 shadow-md backdrop-blur transition hover:bg-white disabled:opacity-60"
          aria-label={
            isFavoritedStatus ? t("removeFromFavorites") : t("addToFavorites")
          }
          title={
            !isFavoritedStatus && isAtMaxCapacity
              ? t("maximumFavoritesReached")
              : `${t("addToFavorites")} (${remainingSlots} ${t("slotsRemaining")})`
          }
        >
          <Star
            size={20}
            className={
              isFavoritedStatus ? "fill-golden text-golden" : "text-slate-500"
            }
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link href={detailsHref} className="focus-visible:outline-golden">
          <h2 className="font-hero-display text-2xl font-semibold leading-tight text-charcoal transition-colors hover:text-turquoise">
            {localizedTitle}
          </h2>
        </Link>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          {location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-turquoise" aria-hidden="true" />
              {location}
            </span>
          )}
          {capacityCocktail ? (
            <span className="flex items-center gap-1.5">
              <Users size={16} className="text-turquoise" aria-hidden="true" />
              {t("upTo")} {capacityCocktail} {t("guests")}
            </span>
          ) : null}
        </div>

        {displayAmenities.length > 0 && (
          <div className="mt-4 flex min-h-7 flex-wrap gap-2">
            {displayAmenities.map((amenity, index) => {
              const amenityTitle =
                amenity?.title?.[locale as "en" | "es"] || amenity?.title?.en
              return amenityTitle ? (
                <span
                  key={`${amenityTitle}-${index}`}
                  className="rounded-md bg-ivory px-2.5 py-1 text-xs font-medium text-charcoal"
                >
                  {amenityTitle}
                </span>
              ) : null
            })}
            {amenities.length > 2 && (
              <span className="self-center text-xs text-slate-500">
                +{amenities.length - 2} {t("more")}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-5">
          <IndividualVenueForm
            venueName={venueName}
            venueTitle={localizedTitle}
            className="block w-full rounded-xl bg-golden px-4 py-3 text-center text-sm font-bold text-charcoal transition hover:brightness-95"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link
              href={detailsHref}
              className="rounded-xl border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-charcoal transition hover:border-golden hover:bg-ivory"
            >
              {t("viewDetails")}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-charcoal transition hover:border-turquoise hover:bg-turquoise/5"
              aria-label={`${t("whatsapp")}: ${localizedTitle}`}
            >
              <MessageCircle size={17} aria-hidden="true" />
              {t("whatsapp")}
            </a>
          </div>
        </div>

        {showError && (error || (!isFavoritedStatus && isAtMaxCapacity)) && (
          <p className="mt-3 text-xs text-red-700" role="alert">
            {error || t("maxFavoritesReached")}
          </p>
        )}
      </div>
    </article>
  )
}

export default IndividualVenueCard
