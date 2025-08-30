"use client"
import React, { useEffect, useState } from "react"
import BlockContent from "../BlockContent/BlockContent"
import MapSection from "../MapComponents/MapSection"
import HeroComponent from "../HeroComponent/HeroComponent"
import VenueOfDay from "../VenueComponents/VenueOfDay"
import TypeVenue from "@/components/VenueComponents/TypeVenue"
import PopUpForm from "./PopUpForm"
const MainPageContent = ({
  mainPage,
  locale,
  typeVenue,
  searchVenues,
  venues,
  popupVenues,
}: {
  mainPage: any
  locale: "en" | "es"
  typeVenue: any
  searchVenues: any
  venues: any
  popupVenues: any
}) => {
  const [popUpReady, setPopUpReady] = useState(false)
  const [hasShown, setHasShown] = useState(false);
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
        const popupShown = sessionStorage.getItem('scheduleCallPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }
      const scrollY = window.scrollY // Get current scroll position

      // Define the scroll position at which the button should become sticky
      const triggerPosition = 300 // Adjust this value based on your page layout

      // Set the sticky state based on scroll position
      if (scrollY > triggerPosition) {
        setPopUpReady(true)
        sessionStorage.setItem('scheduleCallPopupShown', 'true');
      } 
    }

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Timer-based popup trigger
  useEffect(() => {
    // Only run setTimeout in browser environment
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      const popupShown = sessionStorage.getItem('scheduleCallPopupShown');
      if (!popupShown) {
        setPopUpReady(true)
        sessionStorage.setItem('scheduleCallPopupShown', 'true')
      }
    }, 8000)

    // Clean up the timer
    return () => clearTimeout(timer)
  }, [])

  

  return (
    <section className="">
      <PopUpForm popUpReady={popUpReady} setPopUpReady={setPopUpReady} className="bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-charcoal font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-md" locale={locale} venues={popupVenues}/>
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
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-4 z-0 px-4 mt-4">
        <div className="w-full h-96 lg:h-auto lg:ml-4 xl:w-1/2 rounded-2xl overflow-hidden">
          <MapSection venues={venues} height={400} />
        </div>
        <div className="w-full xl:w-1/2 h-full rounded-2xl overflow-hidden">
          <BlockContent content={mainPage.introduction} language={locale} />
        </div>
      </div>
    </section>
  )
}

export default MainPageContent
