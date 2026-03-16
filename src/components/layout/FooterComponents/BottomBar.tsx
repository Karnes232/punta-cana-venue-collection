import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import Script from "next/script"

const BottomBar = ({ companyName }: { companyName: string }) => {
  const t = useTranslations("Footer")
  const locale = useLocale()
  const jsonLd =
    locale === "es"
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Atribución del desarrollo del sitio web",
          inLanguage: "es",
          creator: {
            "@type": "Organization",
            "@id": "https://www.dr-webstudio.com/#organization",
            name: "DR Web Studio",
            url: "https://www.dr-webstudio.com/es",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Website build attribution",
          inLanguage: "en",
          creator: {
            "@type": "Organization",
            "@id": "https://www.dr-webstudio.com/#organization",
            name: "DR Web Studio",
            url: "https://www.dr-webstudio.com/en",
          },
        }
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
          <p className="text-sm text-gray-400 flex flex-col sm:flex-row items-center gap-2 flex-1 justify-center  md:mr-8">
            {t("builtBy")}
            <a
              href={"https://www.dr-webstudio.com/" + locale}
              className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
            >
              <Image
                src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
                alt="DR Web Studio"
                width={17}
                height={16}
                className="h-4"
                loading="lazy"
              />
              DR Web Studio
            </a>
            <span className="hidden sm:inline"> —</span> {t("developedBy")}.
          </p>
        </div>
        <Script
          id="dr-webstudio-builtby-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </div>
    </div>
  )
}

export default BottomBar
