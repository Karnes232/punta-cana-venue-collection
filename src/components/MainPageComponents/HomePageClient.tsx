"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import HeroComponent from "../HeroComponent/HeroComponent"

const PopUpForm = dynamic(() => import("./PopUpForm"), {
  ssr: false,
})

const VenueOfDay = dynamic(() => import("../VenueComponents/VenueOfDay"), {
  loading: () => (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl" />
  ),
})

const TypeVenue = dynamic(
  () => import("@/components/VenueComponents/TypeVenue"),
  {
    loading: () => (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl" />
    ),
  },
)

export interface HomePageClientProps {
  mainPage: any
  locale: "en" | "es"
  typeVenue: any
  searchVenues: any
  popupVenues: any
  calendlyUrls: any
}

export default function HomePageClient({
  mainPage,
  locale,
  typeVenue,
  searchVenues,
  popupVenues,
  calendlyUrls,
}: HomePageClientProps) {
  const [popUpReady, setPopUpReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const popupShown = sessionStorage.getItem("scheduleCallPopupShown")
      if (popupShown) {
        return
      }
      const scrollY = window.scrollY
      const triggerPosition = 300
      if (scrollY > triggerPosition) {
        setPopUpReady(true)
        sessionStorage.setItem("scheduleCallPopupShown", "true")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const timer = setTimeout(() => {
      const popupShown = sessionStorage.getItem("scheduleCallPopupShown")
      if (!popupShown) {
        setPopUpReady(true)
        sessionStorage.setItem("scheduleCallPopupShown", "true")
      }
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PopUpForm
        popUpReady={popUpReady}
        setPopUpReady={setPopUpReady}
        className="bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md"
        locale={locale}
        venues={popupVenues}
        calendlyUrls={calendlyUrls}
      />
      <HeroComponent
        heroImage={mainPage.heroImage}
        heroTitle={mainPage.title[locale]}
        venues={searchVenues}
        locale={locale}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <VenueOfDay venueOfTheDay={mainPage.venueOfTheDay} locale={locale} />
        </div>

        <div className="lg:w-1/2">
          <TypeVenue typeVenue={typeVenue} locale={locale} />
        </div>
      </div>
    </>
  )
}
