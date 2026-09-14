import Image from "next/image"
import Link from "next/link"
import { getLocale } from "next-intl/server"
import { capabilities, eventTypes, Locale, prefix } from "@/lib/enterprise"
import { PCVC_BRAND } from "@/lib/brand"
export default async function Footer() {
  const locale = (await getLocale()) as Locale,
    p = prefix(locale),
    es = locale === "es"
  return (
    <footer className="pc-footer">
      <div className="pc-shell">
        <div className="pc-footer-grid">
          <div>
            <Link href={p || "/"} className="pc-wordmark">
              <Image src={PCVC_BRAND.logo} alt="" width={64} height={64} className="pc-brand-symbol" /><span>Punta Cana<small>Venue Collection</small></span>
            </Link>
            <p>
              {es
                ? "Gestión integral, producción y operación de eventos corporativos en República Dominicana."
                : "Full-service corporate event management, production and destination operations in the Dominican Republic."}
            </p>
            <a href={`mailto:${PCVC_BRAND.email}`}>{PCVC_BRAND.email}</a>
            <a href={`tel:+${PCVC_BRAND.telephone}`}>
              {PCVC_BRAND.phoneDisplay}
            </a>
            <a href={`https://wa.me/${PCVC_BRAND.telephone}`}>WhatsApp ↗</a>
          </div>
          <div>
            <h3>{es ? "Eventos corporativos" : "Corporate Events"}</h3>
            {eventTypes.slice(0, 7).map(e => (
              <Link href={`${p}/corporate-events/${e.slug}`} key={e.slug}>
                {e.title[locale]}
              </Link>
            ))}
          </div>
          <div>
            <h3>{es ? "Capacidades" : "Capabilities"}</h3>
            {capabilities
              .filter((_, i) => [1, 2, 3, 4, 5, 6, 7].includes(i))
              .map(c => (
                <Link href={`${p}/what-we-do/${c.slug}`} key={c.slug}>
                  {c.title[locale]}
                </Link>
              ))}
          </div>
          <div>
            <h3>{es ? "Empresa y recursos" : "Company & Resources"}</h3>
            {[
              ["/venues", "Venues"],
              ["/destinations", es ? "Destinos" : "Destinations"],
              ["/for-agencies", es ? "Para agencias" : "For Agencies"],
              ["/about", es ? "Alex y el equipo" : "Alex & Our Team"],
              ["/blog", es ? "Guías" : "Insights"],
              ["/contact", es ? "Contacto" : "Contact"],
              ["/submit-rfp", es ? "Enviar RFP" : "Submit Your RFP"],
            ].map(([href, label]) => (
              <Link key={href} href={p + href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="pc-footer-bottom">
          <span>© {new Date().getFullYear()} Punta Cana Venue Collection</span>
          <div className="pc-footer-legal">
            {["privacy", "terms", "cookies"].map((x, i) => (
              <Link key={x} href={`${p}/${x}`}>
                {
                  (es
                    ? ["Privacidad", "Términos", "Cookies"]
                    : ["Privacy", "Terms", "Cookies"])[i]
                }
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
