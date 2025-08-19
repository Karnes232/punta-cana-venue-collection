"use client"
import SimpleMap from "@/components/MapComponents/SimpleMap" // this file can import react-leaflet safely

type Venue = {
  id: string
  name: string
  position: [number, number]
  href?: string
  image?: any
}

export default function MapSection({
  venues,
  height = 520,
  initialZoom = 12,
}: {
  venues: Venue[]
  height?: number | string
  initialZoom?: number
}) {
  return <SimpleMap venues={venues} />
}
