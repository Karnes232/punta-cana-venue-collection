import Link from "next/link"
import { Locale, prefix } from "@/lib/enterprise"
export interface VerifiedSpecs {
  sourceUrl?: string
  verifiedAt?: string
  maximum?: number
  theater?: number
  classroom?: number
  banquet?: number
  cocktail?: number
  breakouts?: number
  hotelRooms?: number
  meetingRooms?: number
  exhibitionArea?: number
  operations?: { en?: string; es?: string }
}
export default function VenueSpecifications({
  locale,
  slug,
  specs,
}: {
  locale: Locale
  slug: string
  specs?: VerifiedSpecs
}) {
  const es = locale === "es",
    verified = Boolean(specs?.sourceUrl && specs?.verifiedAt)
  const labels = [
    ["maximum", "Maximum capacity", "Capacidad máxima"],
    ["theater", "Theater", "Teatro"],
    ["classroom", "Classroom", "Escuela"],
    ["banquet", "Banquet", "Banquete"],
    ["cocktail", "Cocktail", "Cóctel"],
    ["breakouts", "Breakout spaces", "Salas paralelas"],
    ["hotelRooms", "Hotel rooms", "Habitaciones"],
    ["meetingRooms", "Meeting rooms", "Salones"],
    ["exhibitionArea", "Exhibition area (m²)", "Área de exposición (m²)"],
  ] as const
  return (
    <section className="pc-enterprise pc-form" style={{ padding: 24 }}>
      <h2 style={{ fontSize: 27, marginBottom: 20 }}>
        {es
          ? "Especificaciones para tu evento"
          : "Specifications for your event"}
      </h2>
      <dl>
        {labels.map(([key, en, sp]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 15,
              borderBottom: "1px solid #ccd2cd",
              padding: "10px 0",
              fontSize: 13,
            }}
          >
            <dt>{es ? sp : en}</dt>
            <dd>
              {verified && typeof specs?.[key] === "number"
                ? specs[key]
                : es
                  ? "Por confirmar"
                  : "To be confirmed"}
            </dd>
          </div>
        ))}
      </dl>
      {verified && (
        <p className="pc-help">
          <a href={specs?.sourceUrl} rel="noopener noreferrer" target="_blank">
            {es ? "Fuente" : "Source"}
          </a>{" "}
          · {specs?.verifiedAt}
        </p>
      )}
      <p className="pc-help">
        {es
          ? "Validamos carga, autobuses, internet, AV, energía, alternativa interior, alimentos y bebidas, traslados y restricciones de proveedores según el montaje."
          : "We validate loading, coach access, internet, AV, power, indoor backup, food and beverage, transfers and supplier restrictions against the layout."}
      </p>
      <Link
        href={`${prefix(locale)}/submit-rfp?venue=${encodeURIComponent(slug)}`}
        className="pc-text-link"
        data-rfp-cta="verified-specifications"
      >
        {es
          ? "Solicitar especificaciones verificadas"
          : "Request Verified Event Specifications"}{" "}
        ↗
      </Link>
    </section>
  )
}
