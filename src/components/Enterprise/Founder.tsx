import Image from "next/image"
import Link from "next/link"
import { Locale, prefix } from "@/lib/enterprise"

export default function Founder({
  locale,
  full = false,
}: {
  locale: Locale
  full?: boolean
}) {
  const es = locale === "es"
  return (
    <section className="pc-section pc-shell pc-founder" id="alex-castro">
      <figure>
        <Image
          src="/images/team/alex-castro.jpeg"
          width={1254}
          height={1254}
          sizes="(max-width: 767px) 100vw, 40vw"
          alt={
            es
              ? "Alex Castro, fundador y director de operaciones de eventos de Punta Cana Venue Collection"
              : "Alex Castro, Founder & Event Operations Director of Punta Cana Venue Collection"
          }
          quality={80}
        />
        <figcaption>
          Alex Castro
          <span>
            {es
              ? "Fundador y director de operaciones de eventos"
              : "Founder & Event Operations Director"}
          </span>
        </figcaption>
      </figure>
      <div>
        <p className="pc-eyebrow">
          {es
            ? "LA EXPERIENCIA DETRÁS DE LA OPERACIÓN"
            : "THE EXPERIENCE BEHIND THE OPERATION"}
        </p>
        <h2>
          {es
            ? "Alex lidera la operación. El equipo la hace posible."
            : "Alex leads the operation. The team makes it possible."}
        </h2>
        <p className="pc-lead">
          {es
            ? "Alex Castro es un empresario dominicano con cerca de una década de experiencia práctica en la industria de eventos."
            : "Alex Castro is a Dominican entrepreneur with nearly a decade of hands-on experience in the events industry."}
        </p>
        <p>
          {es
            ? "Ha participado en la planificación, coordinación y ejecución de eventos corporativos, conferencias, programas MICE y eventos de destino en Punta Cana y otras localidades del país."
            : "He has been involved in the planning, coordination and execution of corporate events, conferences, MICE programs and destination events in Punta Cana and other destinations across the country."}
        </p>
        {full && (
          <>
            <p>
              {es
                ? "Su trayectoria se ha construido en proyectos reales: coordinación de producción, hospitalidad, logística, proveedores y resolución de imprevistos. Su experiencia previa en eventos sociales y románticos forma parte de ese recorrido; hoy dirige el enfoque corporativo de Punta Cana Venue Collection."
                : "His experience has been shaped by real projects: production coordination, hospitality, logistics, suppliers and practical problem-solving. Earlier work in social and romantic events forms part of that background; today, he leads Punta Cana Venue Collection’s corporate focus."}
            </p>
            <p>
              {es
                ? "Una trayectoria intensa en aprendizaje y responsabilidad le ha aportado criterio práctico para abordar proyectos complejos. Alex dirige el trabajo junto con un equipo profesional y una red de proveedores especializados, configurando los recursos adecuados para cada alcance."
                : "An intensive career of learning and responsibility has developed the practical judgment needed to approach complex projects. Alex leads the work alongside a professional team and a specialist supplier network, assembling the resources required for each scope."}
            </p>
          </>
        )}
        <blockquote className="pc-quote">
          {es
            ? "Hacer que los eventos complejos se sientan sencillos para el cliente."
            : "Make complex events feel simple for the client."}
        </blockquote>
        {!full && (
          <Link className="pc-text-link" href={`${prefix(locale)}/about`}>
            {es ? "Conoce a Alex y al equipo" : "Meet Alex & Our Team"} ↗
          </Link>
        )}
      </div>
    </section>
  )
}
