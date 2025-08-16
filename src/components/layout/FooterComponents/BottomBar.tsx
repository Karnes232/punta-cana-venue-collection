import { useTranslations } from "next-intl"
import Link from "next/link"
import React from "react"

const BottomBar = ({ companyName }: { companyName: string }) => {
  const t = useTranslations("Footer")
  return (
    <div className="border-t border-ivory/20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-ivory/60 text-sm">
            &copy; {new Date().getFullYear()} {companyName}.{" "}
            {t("allRightsReserved")}
          </div>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              {t("termsOfService")}
            </Link>
            <Link
              href="/cookies"
              className="text-ivory/60 hover:text-turquoise transition-colors"
            >
              {t("cookiePolicy")}
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mt-4">
          <p className="text-sm text-gray-400 flex items-center gap-2 flex-1 justify-center md:justify-end md:mr-8">
            {t("builtBy")}
            <a
              href="https://dr-webstudio.com"
              className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
            >
              <img
                src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
                alt="DR Web Studio"
                className="h-4"
              />
              DR Web Studio
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BottomBar
