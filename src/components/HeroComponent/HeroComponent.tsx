"use client"

import React, { useMemo, useState } from "react"
import Image from "next/image"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Search, X } from "lucide-react"

interface Venue {
  title: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
}

const HeroComponent = ({
  heroImage,
  heroTitle,
  eyebrow,
  subtitle,
  primaryCta,
  secondaryCta,
  venues = [],
  locale = "en",
}: {
  heroImage?: HeroImage | null
  heroTitle: string
  eyebrow?: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  venues?: Venue[]
  locale?: "en" | "es"
}) => {
  const t = useTranslations("hero")
  const [searchTerm, setSearchTerm] = useState("")

  const altText =
    typeof heroImage?.alt === "string" && heroImage.alt.trim()
      ? heroImage.alt
      : heroTitle

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase(locale)
  const filteredVenues = useMemo(
    () =>
      normalizedSearch
        ? venues.filter(venue => {
            const title = venue.title[locale] || venue.title.en
            return title.toLocaleLowerCase(locale).includes(normalizedSearch)
          })
        : [],
    [locale, normalizedSearch, venues],
  )
  const showResults = Boolean(normalizedSearch)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const handleVenueClick = () => {
    setSearchTerm("")
  }

  return (
    <section className="relative w-full h-[75vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#12232c_0%,#173b45_52%,#167f87_100%)]">
        {heroImage?.asset?.url && (
          <Image
            src={heroImage.asset.url}
            alt={altText}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            className="object-cover object-center"
          />
        )}
      </div>

      <div
        className="absolute inset-0 z-[5] bg-gradient-to-b from-black/55 via-black/35 to-black/60"
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-16 text-center text-white">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-golden md:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="font-hero-display max-w-5xl text-4xl font-bold leading-[0.95] text-shadow-lg sm:text-5xl md:text-7xl">
          {heroTitle}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-3xl text-base font-normal leading-7 text-white/90 md:text-xl md:leading-8">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-golden px-6 py-3 font-semibold text-charcoal transition hover:bg-golden/85"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-white/70 bg-black/15 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-charcoal"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}

        <div className="relative mt-7 w-full max-w-md">
          <label htmlFor="home-venue-search" className="sr-only">
            {t("searchVenues")}
          </label>
          <div className="relative">
            <input
              id="home-venue-search"
              name="venue"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t("searchVenues")}
              autoComplete="off"
              className="w-full rounded-full border-2 border-white/20 bg-white/95 px-6 py-4 text-lg text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-300 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center gap-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 text-gray-500 transition-colors duration-200 hover:text-gray-700"
                  aria-label={
                    locale === "es" ? "Limpiar búsqueda" : "Clear search"
                  }
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
              <div className="p-2 text-gray-500" aria-hidden="true">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </div>

          {showResults && filteredVenues.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-white/20 bg-white/95 shadow-xl backdrop-blur-sm">
              {filteredVenues.map(venue => {
                const title = venue.title[locale] || venue.title.en
                return (
                  <Link
                    key={venue.slug.current}
                    href={`${locale === "es" ? "/es" : ""}/venues/${venue.slug.current}`}
                    onClick={handleVenueClick}
                    className="block border-b border-gray-200 px-6 py-4 text-left text-gray-900 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 hover:bg-white/50"
                  >
                    <div className="font-medium">{title}</div>
                  </Link>
                )
              })}
            </div>
          )}

          {showResults && searchTerm.trim() && filteredVenues.length === 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
              <div className="text-center text-gray-500">
                {t("noVenuesFound")}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroComponent
