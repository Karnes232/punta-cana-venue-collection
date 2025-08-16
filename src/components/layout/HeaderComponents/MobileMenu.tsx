import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { Calendar } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import React from "react"

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
}) => {
  const t = useTranslations("Navbar")
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/venues", label: t("venues") },
    { href: "/inspection", label: t("venueInspection") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/book-inspection", label: t("bookInspection") },
  ]
  return (
    <>
      {/* {isMenuOpen && (
          <div className="lg:hidden border-t border-charcoal/10 py-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Home</Link>
              <Link href="/venues" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Venues</Link>
              <Link href="/inspection" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Venue Inspection</Link>
              <Link href="/blog" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">Blog & Guides</Link>
              <Link href="/about" className="text-charcoal hover:text-turquoise transition-colors font-medium py-2">About</Link>
              <button className="flex items-center justify-center space-x-2 bg-golden text-charcoal px-4 py-3 rounded-full font-medium hover:bg-golden/90 transition-colors mt-4">
                <Calendar size={16} />
                <span>Book Inspection</span>
              </button>
            </div>
          </div>
        )}
    
     */}
      <div
        className={`
                lg:hidden fixed top-28 md:top-36 left-0 right-0 z-50
                transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-10 opacity-0 invisible"}
            `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-200 max-h-[calc(100vh-7rem)] md:max-h-[calc(100vh-9rem)] overflow-y-auto">
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
            <div className="text-slate-700 font-medium mb-3">{t("language")}</div>
            <div className="pl-1">
              <LanguageSwitcher color="slate-700" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
