import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useLocale } from "next-intl"
import { PCVC_BRAND } from "@/lib/brand"

const Logo = () => {
  const locale = useLocale()
  return (
    <Link
      href={locale === "es" ? "/es" : "/"}
      className="flex items-center space-x-3"
      aria-label={PCVC_BRAND.name}
    >
      <div className="w-16 h-16  rounded-full flex items-center justify-center">
        <Image
          src={PCVC_BRAND.logo}
          alt="Punta Cana Venue Collection logo"
          width={64}
          height={64}
          fetchPriority="low"
        />
      </div>
      <div>
        <span className="block text-xl font-bold text-charcoal">
          Punta Cana
        </span>
        <p className="text-sm text-charcoal/70">Venue Collection</p>
      </div>
    </Link>
  )
}

export default Logo
