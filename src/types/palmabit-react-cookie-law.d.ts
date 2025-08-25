declare module "@palmabit/react-cookie-law" {
  interface CookieBannerProps {
    message: string
    wholeDomain?: boolean
    onAccept?: () => void
    onAcceptPreferences?: () => void
    onAcceptStatistics?: () => void
    onAcceptMarketing?: () => void
  }

  export const CookieBanner: React.FC<CookieBannerProps>
}
