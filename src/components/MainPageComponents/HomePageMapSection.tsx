"use client"

import dynamic from "next/dynamic"

const MapSection = dynamic(() => import("../MapComponents/MapSection"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-200" />
  ),
})

export default function HomePageMapSection({
  venues,
  height = 400,
}: {
  venues: any
  height?: number
}) {
  return (
    <div className="h-96 w-full overflow-hidden rounded-2xl lg:ml-4 lg:h-auto xl:w-1/2">
      <MapSection venues={venues} height={height} />
    </div>
  )
}
