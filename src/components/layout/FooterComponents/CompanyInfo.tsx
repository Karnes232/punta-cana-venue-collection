"use client"

import Image from "next/image"
import React from "react"
import { MessageCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { languages, fallbackLng } from "@/i18n/settings"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { PCVC_BRAND } from "@/lib/brand"

const CompanyInfo = () => {
  const params = useParams()
  const currentLocale = (params?.locale as string) || fallbackLng
  const safeLocale = languages.includes(currentLocale)
    ? currentLocale
    : fallbackLng
  const companyDescription =
    safeLocale === "es"
      ? "Operación local white-label para agencias y planners en República Dominicana."
      : "White-label local operations for agencies and planners in the Dominican Republic."

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center">
          <Image
            src={PCVC_BRAND.logo}
            alt="Punta Cana Venue Collection logo"
            width={64}
            height={64}
            className="brightness-100"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-ivory">Punta Cana</h3>
          <p className="text-sm text-ivory/70">Venue Collection</p>
        </div>
      </div>
      <p className="text-ivory/80 mb-6 max-w-md">{companyDescription}</p>
      <div className="flex space-x-4">
        <div className="w-10 h-10 bg-ivory/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors cursor-pointer">
          <a
            href={`https://wa.me/${PCVC_BRAND.telephone}`}
            target="_blank"
            aria-label="WhatsApp"
            rel="noreferrer"
          >
            <MessageCircle className="h-5 w-5 cursor-pointer hover:text-ivory transition-colors" />
          </a>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}

export default CompanyInfo
