import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import React from "react"
import { PCVC_BRAND } from "@/lib/brand"

const BottomBar = () => {
  const t = useTranslations("Footer")
  const locale = useLocale()
  const prefix = locale === "es" ? "/es" : ""
  return (
    <div className="border-t border-ivory/20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-ivory/60 text-sm">
            &copy; {new Date().getFullYear()} {PCVC_BRAND.name}.{" "}
            {t("allRightsReserved")}
          </div>
          <div className="flex space-x-6 text-sm">
            <Link
              href={`${prefix}/privacy`}
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href={`${prefix}/terms`}
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              {t("termsOfService")}
            </Link>
            <Link
              href={`${prefix}/cookies`}
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              {t("cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomBar
