"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"

export type Venue = {
  id: string
  name: string
  position: [number, number] // [lat, lng]
  href?: string
  image?: any
}

// Fix default Leaflet marker icons for Vite/Next bundlers
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

function AutoFit({ points }: { points: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    if (points.length === 1) {
      map.setView(points[0], 14)
      return
    }
    const bounds = L.latLngBounds(
      points.map(([lat, lng]) => L.latLng(lat, lng)),
    )
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map, points])
  return null
}

export default function SimpleMap({
  venues,
  height = "100%",
  initialZoom = 12,
}: {
  venues: Venue[]
  height?: number | string
  initialZoom?: number
}) {
  const points = useMemo(() => venues.map(v => v.position), [venues])
  const center = points[0] ?? ([-33.865, 151.209] as [number, number]) // fallback

  return (
    <MapContainer
      center={center}
      zoom={initialZoom}
      style={{ height, width: "100%" }}
      scrollWheelZoom
    >
      {/* <TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution="Tiles &copy; Esri, i-cubed, USDA, USGS"
/> */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        //attribution="Tiles &copy; Esri, OSM"
      />

      <AutoFit points={points} />

      {venues.map(v => (
        <Marker key={v.id} position={v.position} icon={defaultIcon}>
          <Popup>
            <strong className="text-lg font-bold">{v.name}</strong>
            <Image
              className="w-64 h-auto"
              src={v.image.asset.url}
              alt={v.name}
              width={200}
              height={200}
            />
            {v.href && (
              <>
                <br />
                <Link href={v.href}>View details</Link>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
