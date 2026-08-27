import Link from "next/link"
import React from "react"
import { useLocale, useTranslations } from "next-intl"

const DesktopNav = () => {
  const t = useTranslations("Navbar")
  const locale = useLocale()
  const prefix = locale === "es" ? "/es" : ""
  const links = [
    ["/venues", t("venues")],
    ["/corporate-venues", t("corporate")],
    ["/inspection", t("siteInspections")],
    ["/blog", t("guides")],
    ["/about", t("about")],
    ["/contact", t("contact")],
  ]
  return (
    <div className="hidden items-center space-x-3 lg:flex xl:space-x-6">
      {links.map(([href, label]) => (
        <Link key={href} href={`${prefix}${href}`} className="font-medium text-charcoal transition-colors hover:text-turquoise">
          {label}
        </Link>
      ))}
    </div>
  )
}

export default DesktopNav
