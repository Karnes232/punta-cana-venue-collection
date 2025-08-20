"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export type Venue = {
  id: string
  name: string
  position: [number, number] // [lat, lng]
  href?: string
  image?: any
}

function AutoFit({ points }: { points: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    ;(async () => {
      const L = await import("leaflet")
      if (points.length === 1) {
        map.setView(points[0], 14)
        return
      }
      const bounds = L.latLngBounds(
        points.map(([lat, lng]) => L.latLng(lat, lng)),
      )
      map.fitBounds(bounds, { padding: [40, 40] })
    })()
  }, [map, points])
  return null
}

export default function SimpleMap({
  venues,
  height = "100%",
  initialZoom = 17,
}: {
  venues: Venue[]
  height?: number | string
  initialZoom?: number
}) {
  const [icon, setIcon] = useState<any>(null)
  const [ready, setReady] = useState(false)

  // Load Leaflet and create the default icon on the client only
  useEffect(() => {
    let mounted = true
    ;(async () => {
      const L = await import("leaflet")
      const defaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      })
      if (mounted) {
        setIcon(defaultIcon)
        setReady(true)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const points = useMemo(() => venues.map(v => v.position), [venues])
  const center = points[0] ?? ([18.577542, -68.368463] as [number, number]) // fallback

  if (!ready || !icon) return null // render nothing until client is ready

  return (
    <MapContainer
      center={center}
      zoom={initialZoom}
      style={{ height, width: "100%", zIndex: 0 }}
      scrollWheelZoom
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap &copy; CARTO"
      />
      {/* <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri, i-cubed, USDA, USGS"
        /> */}
      {points.length > 1 && <AutoFit points={points} />}

      {venues.map(v => (
        <Marker key={v.id} position={v.position} icon={icon}>
          <Popup>
            <strong className="text-lg font-bold">{v.name}</strong>
            {v.image?.asset?.url && (
              <Image
                className="w-64 h-auto mt-2 rounded-md"
                src={v.image.asset.url}
                alt={v.name}
                width={256}
                height={160}
              />
            )}
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
