"use client"

import React, { useState } from "react"
import Image from "next/image"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface FilterOptions {
  location: string
  type: string
  capacity: string
  budget: string
}

const HeroComponentVenuePage = ({
  heroImage,
  heroTitle,
  onSearch,
  onFiltersChange,
  filterOptions,
  initialFilters = { location: "", type: "", capacity: "", budget: "" },
  initialSearch = "",
}: {
  heroImage?: HeroImage | null
  heroTitle: string
  onSearch: (searchTerm: string) => void
  onFiltersChange: (filters: FilterOptions) => void
  filterOptions: {
    locations: string[]
    types: string[]
    capacityRanges: string[]
    budgetRanges: string[]
  }
  initialFilters?: FilterOptions
  initialSearch?: string
}) => {
  const t = useTranslations("venueListing")
  const locale = useLocale()
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)
  const [showFilters, setShowFilters] = useState(
    Object.values(initialFilters).some(Boolean),
  )

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string,
  ) => {
    const updatedFilters = { ...filters, [filterType]: value }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      location: "",
      type: "",
      capacity: "",
      budget: "",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="bg-slate-950">
      <section className="relative isolate min-h-[32rem] overflow-hidden sm:min-h-[36rem] lg:min-h-[40rem]">
        {heroImage?.asset?.url ? (
          <Image
            src={heroImage.asset.url}
            alt={heroImage.alt || heroTitle}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            className="-z-20 object-cover"
          />
        ) : (
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-900 via-slate-800 to-turquoise" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/55 via-slate-950/62 to-slate-950/88" />

        <div className="mx-auto flex min-h-[32rem] w-full max-w-7xl flex-col items-center justify-center px-4 pb-12 pt-28 text-center text-white sm:min-h-[36rem] sm:px-6 lg:min-h-[40rem] lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-golden sm:text-sm">
            {t("heroEyebrow")}
          </p>
          <h1 className="font-hero-display max-w-4xl text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl lg:text-7xl">
            {heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-normal leading-7 text-white/85 sm:text-lg">
            {t("heroSubtitle")}
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 w-full max-w-2xl"
            role="search"
            name="venueSearch"
            method="GET"
            toolname="search-event-venues"
            tooldescription={
              locale === "es"
                ? "Busca venues para eventos por nombre, ubicación o tipo en Punta Cana y República Dominicana."
                : "Search event venues by name, location, or type in Punta Cana and the Dominican Republic."
            }
          >
            <label htmlFor="venue-search" className="sr-only">
              {t("searchAria")}
            </label>
            <div className="relative">
              <input
                id="venue-search"
                name="search"
                type="search"
                value={searchTerm}
                onChange={event => {
                  setSearchTerm(event.target.value)
                  onSearch(event.target.value)
                }}
                placeholder={t("searchPlaceholder")}
                autoComplete="off"
                toolparamdescription={
                  locale === "es"
                    ? "Nombre, ubicación o tipo de venue que se desea encontrar."
                    : "Venue name, location, or type to find."
                }
                className="min-h-14 w-full rounded-2xl border border-white/30 bg-white px-5 pr-14 text-base font-normal text-slate-950 shadow-xl outline-none transition placeholder:text-slate-500 focus:border-golden focus:ring-4 focus:ring-golden/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl bg-golden text-charcoal transition hover:brightness-95"
                aria-label={t("searchAria")}
              >
                <Search size={20} aria-hidden="true" />
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={() => setShowFilters(current => !current)}
            className="mt-4 flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            aria-expanded={showFilters}
            aria-controls="venue-filters"
          >
            {showFilters ? <X size={18} /> : <SlidersHorizontal size={18} />}
            {t("filters")}
          </button>
        </div>
      </section>

      {showFilters && (
        <div
          id="venue-filters"
          className="border-t border-white/10 bg-slate-900"
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FilterSelect
                name="location"
                label={t("location")}
                value={filters.location}
                onChange={value => handleFilterChange("location", value)}
                emptyLabel={t("allLocations")}
                options={filterOptions.locations}
              />
              <FilterSelect
                name="type"
                label={t("type")}
                value={filters.type}
                onChange={value => handleFilterChange("type", value)}
                emptyLabel={t("allTypes")}
                options={filterOptions.types}
              />
              <FilterSelect
                name="capacity"
                label={t("capacity")}
                value={filters.capacity}
                onChange={value => handleFilterChange("capacity", value)}
                emptyLabel={t("anyCapacity")}
                options={filterOptions.capacityRanges}
              />
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm font-semibold text-white/80 underline decoration-golden underline-offset-4 transition hover:text-white"
              >
                {t("clearAllFilters")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  name,
  label,
  value,
  onChange,
  emptyLabel,
  options,
}: {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  emptyLabel: string
  options: string[]
}) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-sm font-semibold text-white">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={event => onChange(event.target.value)}
        toolparamdescription={label}
        className="min-h-12 w-full rounded-xl border border-white/15 bg-white px-4 text-sm text-slate-950 outline-none focus:border-golden focus:ring-4 focus:ring-golden/20"
      >
        <option value="">{emptyLabel}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default HeroComponentVenuePage
