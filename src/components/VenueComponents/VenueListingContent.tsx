"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import HeroComponentVenuePage from "../HeroComponent/HeroComponentVenuePage"
import IndividualVenueCard from "./IndividualVenueCard"
import { VenuePage } from "@/sanity/queries/VenuePage/VenuePage"
import { IndividualVenue } from "@/sanity/queries/IndividualVenues/IndividualVenues"
import { PCVC_BRAND } from "@/lib/brand"

interface FilterOptions {
  location: string
  type: string
  capacity: string
  budget: string
}

type VenueWithStringLocation = Omit<IndividualVenue, "location"> & {
  location: string
}

const VenueListingContent = ({
  venuePage,
  individualVenues,
  locale,
  initialFilters = { location: "", type: "", capacity: "", budget: "" },
}: {
  venuePage: VenuePage | null
  individualVenues: IndividualVenue[] | null
  locale: "en" | "es"
  initialFilters?: FilterOptions
}) => {
  const t = useTranslations("venueListing")
  const transformedVenues: VenueWithStringLocation[] = useMemo(
    () =>
      (individualVenues || [])
        .filter(venue => venue?.slug?.current)
        .map(venue => ({
          ...venue,
          location: venue.location?.location || "",
        })),
    [individualVenues],
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const filterOptions = useMemo(() => {
    const locations = [
      ...new Set(
        transformedVenues.map(venue => venue.location).filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b))
    const types = [
      ...new Set(
        transformedVenues.flatMap(venue =>
          (venue.type || [])
            .map(item => item?.title?.[locale] || item?.title?.en)
            .filter(Boolean),
        ),
      ),
    ].sort((a, b) => a.localeCompare(b)) as string[]

    return {
      locations,
      types,
      capacityRanges: [
        t("capacityUpTo50"),
        t("capacity51To100"),
        t("capacity101To200"),
        t("capacity201To500"),
        t("capacity500Plus"),
      ],
      budgetRanges: [],
    }
  }, [locale, t, transformedVenues])

  const filteredVenues = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase(locale)

    return transformedVenues.filter(venue => {
      const title = venue.title?.[locale] || venue.title?.en || venue.venueName
      const searchableText = `${title} ${venue.location} ${(venue.type || [])
        .map(item => item?.title?.[locale] || item?.title?.en || "")
        .join(" ")}`.toLocaleLowerCase(locale)

      if (normalizedSearch && !searchableText.includes(normalizedSearch)) {
        return false
      }
      if (filters.location && venue.location !== filters.location) return false
      if (
        filters.type &&
        !(venue.type || []).some(
          item => (item?.title?.[locale] || item?.title?.en) === filters.type,
        )
      ) {
        return false
      }

      const capacity = venue.capacityCocktail || 0
      if (filters.capacity === t("capacityUpTo50") && capacity > 50)
        return false
      if (
        filters.capacity === t("capacity51To100") &&
        (capacity < 51 || capacity > 100)
      ) {
        return false
      }
      if (
        filters.capacity === t("capacity101To200") &&
        (capacity < 101 || capacity > 200)
      ) {
        return false
      }
      if (
        filters.capacity === t("capacity201To500") &&
        (capacity < 201 || capacity > 500)
      ) {
        return false
      }
      if (filters.capacity === t("capacity500Plus") && capacity <= 500) {
        return false
      }

      return true
    })
  }, [filters, locale, searchTerm, t, transformedVenues])

  const contactHref = `${locale === "es" ? "/es" : ""}/contact`
  const whatsappText =
    locale === "es"
      ? "Hola, necesito ayuda para seleccionar y operar un venue para un evento en República Dominicana."
      : "Hello, I need help selecting and operating a venue for an event in the Dominican Republic."
  const whatsappHref = `https://wa.me/${PCVC_BRAND.telephone}?text=${encodeURIComponent(whatsappText)}`

  return (
    <div className="bg-[#fbfaf7]">
      <HeroComponentVenuePage
        heroImage={venuePage?.heroImage}
        heroTitle={t("heroTitle")}
        onSearch={setSearchTerm}
        onFiltersChange={setFilters}
        filterOptions={filterOptions}
        initialFilters={initialFilters}
      />

      <section
        id="venue-results"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-turquoise sm:text-sm">
            {t("collectionEyebrow")}
          </p>
          <h2 className="font-hero-display mt-3 text-3xl font-semibold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("collectionTitle")}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            {t("collectionDescription")}
          </p>
          <p
            className="mt-4 text-sm font-bold text-slate-800"
            aria-live="polite"
          >
            {t("showingVenues", { count: filteredVenues.length })}
          </p>
        </div>

        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7">
            {filteredVenues.map(venue => (
              <IndividualVenueCard
                key={venue.slug.current}
                venue={venue}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
            <h2 className="font-hero-display text-3xl font-semibold text-charcoal">
              {t("noVenuesTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              {t("noVenuesHelp")}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-golden px-5 py-3 text-sm font-bold text-charcoal"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {t("whatsapp")}
            </a>
          </div>
        )}
      </section>

      <section className="bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-golden sm:text-sm">
              {t("agencyCtaEyebrow")}
            </p>
            <h2 className="font-hero-display mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
              {t("agencyCtaTitle")}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
              {t("agencyCtaDescription")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={contactHref}
              className="rounded-xl bg-golden px-5 py-3 text-center text-sm font-bold text-charcoal transition hover:brightness-95"
            >
              {t("agencyCtaButton")}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VenueListingContent
