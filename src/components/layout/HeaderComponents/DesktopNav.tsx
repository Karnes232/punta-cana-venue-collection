import Link from "next/link"
import React from "react"
import { useTranslations } from "next-intl"

const DesktopNav = () => {
  const t = useTranslations("Navbar")
  return (
    <div className="hidden lg:flex items-center space-x-3 xl:space-x-8">
      <Link
        href="/"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        {t("home")}
      </Link>
      <Link
        href="/venues"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        {t("venues")}
      </Link>
      <Link
        href="/inspection"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        {t("venueInspection")}
      </Link>
      <Link
        href="/blog"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        {t("blog")}
      </Link>
      <Link
        href="/about"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        {t("about")}
      </Link>
      <Link
        href="/contact"
        className="text-charcoal hover:text-turquoise transition-colors font-medium"
      >
        {t("contact")}
      </Link>
    </div>
  )
}

export default DesktopNav
