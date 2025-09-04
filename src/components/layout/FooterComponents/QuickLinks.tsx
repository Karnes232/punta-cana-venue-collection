import { useTranslations } from "next-intl"
import Link from "next/link"
import React from "react"

const QuickLinks = () => {
  const t = useTranslations("Footer")
  return (
    <div>
      <h3 className="text-golden font-semibold mb-6">{t("quickLinks")}</h3>
      <div className="space-y-3">
        <Link
          href="/venues"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("venues")}
        </Link>
        <Link
          href="/inspection"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("venueInspection")}
        </Link>
        <Link
          href="/blog"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("blog")}
        </Link>
        <Link
          href="/about"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("about")}
        </Link>
        <Link
          href="/add-venue"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("addVenue")}
        </Link>
        <Link
          href="/contact"
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("contact")}
        </Link>
      </div>
    </div>
  )
}

export default QuickLinks
