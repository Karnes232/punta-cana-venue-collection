"use client"

import Image from "next/image"
import React from "react"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"
import { useParams } from "next/navigation"
import { languages, fallbackLng } from "@/i18n/settings"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"

const CompanyInfo = ({
  companyInfo,
  logo,
}: {
  companyInfo: any
  logo: string
}) => {
  const params = useParams()
  const currentLocale = (params?.locale as string) || fallbackLng
  const safeLocale = languages.includes(currentLocale)
    ? currentLocale
    : fallbackLng

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center">
          <Image
            src={logo}
            alt="logo"
            width={64}
            height={64}
            className="brightness-100"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-ivory">
            {companyInfo.companyName.split(" ").slice(0, 2).join(" ")}
          </h3>
          <p className="text-sm text-ivory/70">
            {companyInfo.companyName.split(" ").slice(2, 4).join(" ")}
          </p>
        </div>
      </div>
      <p className="text-ivory/80 mb-6 max-w-md">
        {companyInfo.companyDescription[safeLocale]}
      </p>
      <div className="flex space-x-4">
        <div className="w-10 h-10 bg-ivory/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors cursor-pointer">
          <a
            href={companyInfo.socialLinks.facebook}
            target="_blank"
            aria-label="Facebook"
            rel="noreferrer"
          >
            <FaFacebookF className="h-5 w-5 cursor-pointer hover:text-ivory transition-colors" />
          </a>
        </div>
        <div className="w-10 h-10 bg-ivory/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors cursor-pointer">
          <a
            href={companyInfo.socialLinks.instagram}
            target="_blank"
            aria-label="Instagram"
            rel="noreferrer"
          >
            <FaInstagram className="h-5 w-5 cursor-pointer hover:text-ivory transition-colors" />
          </a>
        </div>
        <div className="w-10 h-10 bg-ivory/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors cursor-pointer">
          <a
            href={`https://wa.me/${companyInfo.telephone}`}
            target="_blank"
            aria-label="WhatsApp"
            rel="noreferrer"
          >
            <FaWhatsapp className="h-5 w-5 cursor-pointer hover:text-ivory transition-colors" />
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
