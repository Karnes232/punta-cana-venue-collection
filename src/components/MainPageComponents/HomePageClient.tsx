import React from "react"
import HeroComponent from "../HeroComponent/HeroComponent"
import CorporateHomeSections from "../CorporateComponents/CorporateHomeSections"
import { homeCorporateCopy } from "@/lib/corporateContent"

export interface HomePageClientProps {
  mainPage: any
  locale: "en" | "es"
  searchVenues: any
}

export default function HomePageClient({
  mainPage,
  locale,
  searchVenues,
}: HomePageClientProps) {
  const copy = homeCorporateCopy[locale]
  const prefix = locale === "es" ? "/es" : ""

  return (
    <>
      <HeroComponent
        heroImage={mainPage?.heroImage}
        heroTitle={copy.heroTitle}
        eyebrow={copy.eyebrow}
        subtitle={copy.heroSubtitle}
        primaryCta={{ label: copy.primaryCta, href: "#venue-proposal" }}
        secondaryCta={{
          label: copy.secondaryCta,
          href: `${prefix}/corporate-venues`,
        }}
        venues={searchVenues}
        locale={locale}
      />

      <CorporateHomeSections locale={locale} />
    </>
  )
}
