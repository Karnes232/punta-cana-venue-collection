"use client"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { Calendar } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import React, { useState } from "react"

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
}) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const t = useTranslations("Navbar")
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/venues", label: t("venues") },
    { href: "/inspection", label: t("venueInspection") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    // { href: "/book-inspection", label: t("bookInspection") },
  ]
  return (
    <>
      <div
        className={`
                lg:hidden fixed top-32 md:top-28 left-0 right-0 z-50
                transform transition-all duration-300 ease-in-out min-h-screen bg-ivory
                ${isMenuOpen ? "translate-y-0 opacity-100 visible " : "-translate-y-10 opacity-0 invisible"}
            `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-300 shadow-2xl max-h-[calc(100vh-7rem)] md:max-h-[calc(100vh-9rem)] overflow-y-auto border-b-2 border-b-slate-300">
          {navItems.map((item, index) => (
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              key={index}
              href={item.href}
              className="block px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-md font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="px-3 py-2 border-t border-slate-100 mt-2 pt-4">
            <div className="text-slate-700 font-medium mb-3">
              {t("language")}
            </div>
            <div className={`${isLanguageOpen ? "pb-30" : "pb-0"}`}>
              <LanguageSwitcher
                color="slate-700"
                onDropdownToggle={setIsLanguageOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
