import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import React from "react"

const QuickLinks = () => {
  const t = useTranslations("Footer")
  const locale = useLocale()
  const prefix = locale === "es" ? "/es" : ""
  return (
    <div>
      <h3 className="text-golden font-semibold mb-6">{t("quickLinks")}</h3>
      <div className="space-y-3">
        <Link
          href={`${prefix}/venues`}
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("venues")}
        </Link>
        <Link
          href={`${prefix}/corporate-venues`}
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("corporateVenues")}
        </Link>
        <Link
          href={`${prefix}/inspection`}
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("venueInspection")}
        </Link>
        <Link
          href={`${prefix}/blog`}
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("blog")}
        </Link>
        <Link
          href={`${prefix}/about`}
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("about")}
        </Link>
        <Link
          href={`${prefix}/contact`}
          className="block text-ivory/80 hover:text-turquoise transition-colors"
        >
          {t("contact")}
        </Link>
        <Link
          href={`${prefix}/corporate-venues#venue-proposal`}
          className="block font-semibold text-golden transition-colors hover:text-turquoise"
        >
          {t("requestVenueProposal")}
        </Link>
      </div>
    </div>
  )
}

export default QuickLinks
