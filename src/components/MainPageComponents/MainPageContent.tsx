import HomePageClient from "./HomePageClient"
import HomePageMapSection from "./HomePageMapSection"
import { CheckCircle2 } from "lucide-react"

export interface MainPageContentProps {
  mainPage: any
  locale: "en" | "es"
  typeVenue: any
  searchVenues: any
  venues: any
  popupVenues: any
  calendlyUrls: any
}

export default function MainPageContent({
  mainPage,
  locale,
  typeVenue,
  searchVenues,
  venues,
  popupVenues,
  calendlyUrls,
}: MainPageContentProps) {
  const es = locale === "es"
  return (
    <section className="">
      <HomePageClient
        mainPage={mainPage}
        locale={locale}
        typeVenue={typeVenue}
        searchVenues={searchVenues}
        popupVenues={popupVenues}
        calendlyUrls={calendlyUrls}
      />

      <div
        className="z-0 mx-auto mt-4 flex max-w-7xl flex-col gap-4 px-4 lg:flex-row-reverse"
        aria-labelledby="local-operations-title"
      >
        <HomePageMapSection venues={venues} height={400} />
        <div className="h-full w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory p-7 xl:w-1/2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-golden">
            {es ? "Cobertura local real" : "True local coverage"}
          </p>
          <h2
            id="local-operations-title"
            className="mt-3 font-hero-display text-4xl leading-tight text-charcoal"
          >
            {es
              ? "Tu operación en toda República Dominicana"
              : "Your operation across the Dominican Republic"}
          </h2>
          <p className="mt-4 leading-7 text-charcoal/70">
            {es
              ? "Actuamos como la extensión local de agencias y planners internacionales. Seleccionamos venues, contratamos proveedores y ejecutamos la logística y producción bajo tu marca."
              : "We act as the local extension of international agencies and planners. We source venues, contract suppliers and execute logistics and production under your brand."}
          </p>
          <ul className="mt-5 space-y-3 text-charcoal/75">
            {(es
              ? [
                  "Representación local bajo tu marca",
                  "Producción, transporte y operación de invitados",
                  "Inspecciones gratuitas para proyectos activos",
                ]
              : [
                  "Local representation under your brand",
                  "Production, transport and guest operations",
                  "Complimentary inspections for active projects",
                ]
            ).map(item => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-turquoise" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
