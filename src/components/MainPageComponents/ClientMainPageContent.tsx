"use client"
import dynamic from "next/dynamic"

const MainPageContent = dynamic(() => import("./MainPageContent"), {
  ssr: false
})

interface ClientMainPageContentProps {
  mainPage: any
  locale: "en" | "es"
  typeVenue: any
  searchVenues: any
  venues: any
  popupVenues: any
}

export default function ClientMainPageContent(props: ClientMainPageContentProps) {
  return <MainPageContent {...props} />
}
