declare module "@changey/react-leaflet-markercluster" {
  import { ComponentType } from "react"
  import { MarkerClusterGroupOptions } from "leaflet.markercluster"

  interface MarkerClusterGroupProps extends MarkerClusterGroupOptions {
    children?: React.ReactNode
    chunkedLoading?: boolean
    showCoverageOnHover?: boolean
    spiderfyOnEveryZoom?: boolean
    maxClusterRadius?: number
  }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>
  export default MarkerClusterGroup
}
