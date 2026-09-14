"use client"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { PCVC_BRAND } from "@/lib/brand"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { Locale, nav, prefix, rfpLabel } from "@/lib/enterprise"
export default function Navigation() {
  const locale = useLocale() as Locale,
    p = prefix(locale),
    path = usePathname(),
    [open, setOpen] = useState(false),
    button = useRef<HTMLButtonElement>(null)
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener("keydown", close)
    return () => document.removeEventListener("keydown", close)
  }, [open])
  return (
    <>
      <a className="pc-skip" href="#main-content">
        {locale === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <header className="pc-nav">
        <div className="pc-nav-row">
          <Link
            className="pc-wordmark"
            href={p || "/"}
            aria-label="Punta Cana Venue Collection"
          >
            <Image src={PCVC_BRAND.logo} alt="" width={64} height={64} className="pc-brand-symbol" /><span>Punta Cana<small>Venue Collection</small></span>
          </Link>
          <nav
            className="pc-nav-links"
            aria-label={
              locale === "es" ? "Navegación principal" : "Main navigation"
            }
          >
            {nav.map(([href, label]) => (
              <Link
                key={href}
                href={p + href}
                aria-current={path === p + href ? "page" : undefined}
              >
                {label[locale]}
              </Link>
            ))}
          </nav>
          <div className="pc-nav-actions">
            <LanguageSwitcher color="charcoal" />
            <Link
              href={`${p}/submit-rfp`}
              className="pc-button"
              data-rfp-cta="navigation"
            >
              {rfpLabel[locale]} ↗
            </Link>
            <button
              ref={button}
              className="pc-menu-toggle"
              aria-expanded={open}
              aria-controls="pc-mobile-navigation"
              aria-label={
                locale === "es"
                  ? open
                    ? "Cerrar menú"
                    : "Abrir menú"
                  : open
                    ? "Close menu"
                    : "Open menu"
              }
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="pc-mobile-navigation"
            className="pc-mobile-nav"
            aria-label={
              locale === "es" ? "Navegación móvil" : "Mobile navigation"
            }
          >
            {nav.map(([href, label]) => (
              <Link onClick={() => setOpen(false)} key={href} href={p + href}>
                {label[locale]}
              </Link>
            ))}
            <Link href={`${p}/submit-rfp`} data-rfp-cta="mobile-menu">
              {rfpLabel[locale]} ↗
            </Link>
          </nav>
        )}
      </header>
      <Link
        className="pc-button pc-mobile-cta"
        href={`${p}/start-project`}
        data-rfp-cta="mobile-sticky"
      >
        {locale === "es" ? "Inicia tu proyecto" : "Start Your Project"} ↗
      </Link>
    </>
  )
}
