import Link from "next/link"
import {
  capabilities,
  copy,
  destinations,
  eventTypes,
  Locale,
  prefix,
} from "@/lib/enterprise"
import {
  Capabilities,
  Closing,
  ConceptImage,
  PageIntro,
  Process,
  RfpLink,
} from "./Sections"
import Founder from "./Founder"
import RfpForm from "./RfpForm"
export const staticPages = [
  "what-we-do",
  "corporate-events",
  "destinations",
  "destinations/punta-cana",
  "destinations/santo-domingo",
  "for-agencies",
  "submit-rfp",
  "start-project",
  "rfp-received",
  "our-work",
]
export const enterprisePaths = [
  ...staticPages,
  ...capabilities.map(c => "what-we-do/" + c.slug),
  ...eventTypes.map(e => "corporate-events/" + e.slug),
]
export function pageCopy(path: string, locale: Locale) {
  const cap = capabilities.find(c => path === "what-we-do/" + c.slug)
  if (cap) return { title: cap.title[locale], description: cap.summary[locale] }
  const event = eventTypes.find(e => path === "corporate-events/" + e.slug)
  if (event)
    return {
      title:
        event.title[locale] +
        (locale === "es"
          ? " en República Dominicana"
          : " in the Dominican Republic"),
      description: event.focus[locale],
    }
  const titles: Record<string, ReturnType<typeof copy>> = {
    "what-we-do": copy(
      "One team for the entire event.",
      "Un equipo para todo el evento.",
    ),
    "corporate-events": copy(
      "Built for complex corporate events.",
      "Preparados para eventos corporativos complejos.",
    ),
    destinations: copy(
      "Dominican expertise. National reach.",
      "Experiencia dominicana. Alcance nacional.",
    ),
    "destinations/punta-cana": copy(
      "Corporate events in Punta Cana.",
      "Eventos corporativos en Punta Cana.",
    ),
    "destinations/santo-domingo": copy(
      "Corporate events in Santo Domingo.",
      "Eventos corporativos en Santo Domingo.",
    ),
    "for-agencies": copy(
      "You own the client. We operate the Dominican Republic.",
      "Tu cliente. Nuestra operación en República Dominicana.",
    ),
    "submit-rfp": copy(
      "Tell us what you’re planning.",
      "Cuéntanos qué estás organizando.",
    ),
    "start-project": copy(
      "Start with the essentials.",
      "Comencemos por lo esencial.",
    ),
    "rfp-received": copy(
      "Your project has been received.",
      "Hemos recibido tu proyecto.",
    ),
    "our-work": copy(
      "From concept to event delivery.",
      "Del concepto a la ejecución del evento.",
    ),
    about: copy(
      "Real people. One accountable operation.",
      "Personas reales. Una operación responsable.",
    ),
    contact: copy("Let’s talk about your event.", "Hablemos de tu evento."),
  }
  const descriptions: Record<string, ReturnType<typeof copy>> = {
    "what-we-do": copy(
      "Planning, creative direction, sourcing, production and logistics. Connected through one local team from the first brief to final breakdown.",
      "Planificación, dirección creativa, selección, producción y logística. Un equipo local las conecta desde el brief hasta el desmontaje.",
    ),
    "corporate-events": copy(
      "We build the operation around your objectives, complexity and scope, with no rigid attendee minimum.",
      "Construimos la operación según tus objetivos, complejidad y alcance, sin un mínimo rígido de asistentes.",
    ),
    destinations: copy(
      "We match the destination to the meeting, then coordinate the venues, production, hospitality and movement it requires.",
      "Elegimos el destino según la reunión y coordinamos venues, producción, hospitalidad y movimientos.",
    ),
    "destinations/punta-cana": copy(
      "Venue strategy, conference production, hotel coordination and guest logistics through one local team.",
      "Estrategia de venues, producción de conferencias, coordinación hotelera y logística con un equipo local.",
    ),
    "destinations/santo-domingo": copy(
      "A destination strategy for business meetings, conferences and corporate programs in the Dominican capital.",
      "Una estrategia de destino para reuniones, conferencias y programas corporativos en la capital dominicana.",
    ),
    "for-agencies": copy(
      "White-label, PCVC-branded or hybrid delivery, structured around your client relationship and communication model.",
      "Ejecución white-label, con marca PCVC o híbrida, según tu relación con el cliente y modelo de comunicación.",
    ),
    "submit-rfp": copy(
      "Send your objectives, dates and scope. Already have an RFP? Share the brief and let our team coordinate the next steps.",
      "Comparte objetivos, fechas y alcance. ¿Ya tienes un RFP? Comparte el brief y nuestro equipo coordinará los siguientes pasos.",
    ),
    "start-project": copy(
      "A short brief is enough to begin a conversation. Share the company, dates, attendance and what you want to achieve.",
      "Un brief breve basta para empezar. Comparte empresa, fechas, asistentes y lo que quieres conseguir.",
    ),
    "rfp-received": copy(
      "Our team will review your brief and begin evaluating the operational requirements.",
      "Nuestro equipo revisará el brief y comenzará a evaluar los requisitos operativos.",
    ),
    "our-work": copy(
      "Our approach connects creative development, production planning and on-site operations. Published project stories must be supported by real work and approved material.",
      "Nuestro enfoque conecta desarrollo creativo, planificación de producción y operación en sitio. Los casos publicados deben contar con trabajo real y material aprobado.",
    ),
    about: copy(
      "Punta Cana Venue Collection plans, produces and operates corporate events throughout the Dominican Republic.",
      "Punta Cana Venue Collection planifica, produce y opera eventos corporativos en toda República Dominicana.",
    ),
    contact: copy(
      "Reach our local team directly or share a short project brief.",
      "Contacta directamente con nuestro equipo local o comparte un brief breve.",
    ),
  }
  return {
    title: titles[path]?.[locale] || "",
    description: descriptions[path]?.[locale] || "",
  }
}
export default function EnterprisePage({
  locale,
  path,
}: {
  locale: Locale
  path: string
}) {
  const es = locale === "es",
    p = prefix(locale),
    content = pageCopy(path, locale),
    cap = capabilities.find(c => path === "what-we-do/" + c.slug),
    event = eventTypes.find(e => path === "corporate-events/" + e.slug)
  if (path === "rfp-received")
    return (
      <div className="pc-enterprise">
        <div className="pc-shell pc-status">
          <p className="pc-eyebrow">PUNTA CANA VENUE COLLECTION</p>
          <h1>{content.title}</h1>
          <p className="pc-lead">{content.description}</p>
          <a
            className="pc-text-link"
            href="mailto:info@puntacanavenuecollection.com"
          >
            info@puntacanavenuecollection.com ↗
          </a>
          <div>
            <Link className="pc-button" href={p || "/"}>
              {es ? "Volver al inicio" : "Back to home"}
            </Link>
          </div>
        </div>
      </div>
    )
  return (
    <div className="pc-enterprise">
      <PageIntro locale={locale} path={`/${path}`} {...content} />
      {path === "what-we-do" && (
        <>
          <section className="pc-dark">
            <div className="pc-shell pc-section">
              <Capabilities locale={locale} />
            </div>
          </section>
          <Process locale={locale} />
        </>
      )}
      {cap && (
        <>
          <div className="pc-shell pc-editorial">
            <ConceptImage
              locale={locale}
              name={cap.image}
              alt={`${cap.title[locale]} — ${es ? "imagen conceptual" : "conceptual imagery"}`}
            />
            <div className="pc-editorial-copy">
              <p className="pc-eyebrow">
                {es ? "INTEGRADO EN TU EVENTO" : "PART OF YOUR COMPLETE EVENT"}
              </p>
              <h2>
                {es
                  ? "Del alcance a la ejecución."
                  : "From scope to execution."}
              </h2>
              <p>{cap.output[locale]}</p>
              <RfpLink locale={locale} source={path} />
            </div>
          </div>
          <section className="pc-section pc-shell pc-split">
            <div>
              <p className="pc-eyebrow">
                {es ? "ALCANCE DEL SERVICIO" : "SERVICE SCOPE"}
              </p>
              <h2>
                {es ? "Lo que podemos coordinar." : "What we can coordinate."}
              </h2>
            </div>
            <ul className="pc-scope">
              {cap.scope.map(x => (
                <li key={x.en}>{x[locale]}</li>
              ))}
            </ul>
          </section>
          <section className="pc-shell pc-section">
            <h2>
              {es
                ? "Decisiones antes de producir."
                : "Decisions before production."}
            </h2>
            <div className="pc-content-grid" style={{ marginTop: 35 }}>
              {[
                copy("Define the requirement", "Definir los requisitos"),
                copy("Confirm the operation", "Confirmar la operación"),
                copy("Coordinate delivery", "Coordinar la ejecución"),
              ].map((x, i) => (
                <article className="pc-content-card" key={x.en}>
                  <span className="pc-number">0{i + 1}</span>
                  <h3>{x[locale]}</h3>
                  <p>
                    {
                      [
                        copy(
                          "We review the brief, audience, dates and dependencies with your team.",
                          "Revisamos brief, audiencia, fechas y dependencias con tu equipo.",
                        ),
                        copy(
                          "Scope, budget, venue conditions and supplier responsibilities are agreed before execution.",
                          "Se acuerdan alcance, presupuesto, condiciones del venue y responsabilidades antes de ejecutar.",
                        ),
                        copy(
                          "We connect suppliers, schedules and on-site direction under one project plan.",
                          "Conectamos proveedores, cronogramas y dirección en sitio bajo un plan común.",
                        ),
                      ][i][locale]
                    }
                  </p>
                </article>
              ))}
            </div>
            <Link className="pc-text-link" href={`${p}/what-we-do`}>
              {es ? "Ver todas las capacidades" : "View all capabilities"} ↗
            </Link>
          </section>
        </>
      )}
      {path === "corporate-events" && (
        <section className="pc-shell pc-section">
          <div className="pc-content-grid">
            {eventTypes.map(e => (
              <article className="pc-content-card" key={e.slug}>
                <h2>{e.title[locale]}</h2>
                <p>{e.focus[locale]}</p>
                <Link
                  className="pc-text-link"
                  href={`${p}/corporate-events/${e.slug}`}
                >
                  {es ? "Explorar el programa" : "Explore the program"} ↗
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
      {event && (
        <>
          <div className="pc-shell pc-editorial">
            <ConceptImage
              locale={locale}
              name={
                event.slug === "trade-events"
                  ? "exhibitions"
                  : event.slug === "product-launches"
                    ? "launch"
                    : event.slug === "awards-galas"
                      ? "gala"
                      : "conference"
              }
              alt={
                es
                  ? "Concepto de evento corporativo"
                  : "Corporate event concept"
              }
            />
            <div className="pc-editorial-copy">
              <h2>
                {es
                  ? "El programa define la operación."
                  : "The program defines the operation."}
              </h2>
              <p style={{ marginTop: 25 }}>{event.requirements[locale]}</p>
              <RfpLink locale={locale} source={path} />
            </div>
          </div>
          <section className="pc-section pc-shell pc-split">
            <div>
              <h2>
                {es
                  ? "Comparte el objetivo. Construimos el plan."
                  : "Share the objective. We build the plan."}
              </h2>
              <p className="pc-lead">
                {es
                  ? "Una conferencia, reunión o programa de varios días necesita más que un espacio. Diseñamos el proyecto alrededor de sus dependencias reales."
                  : "A conference, meeting or multi-day program needs more than a setting. We plan the project around its actual dependencies."}
              </p>
            </div>
            <ul className="pc-scope">
              {[
                copy(
                  "Objectives, audience, dates and agenda",
                  "Objetivos, audiencia, fechas y agenda",
                ),
                copy(
                  "Hotel rooms, session formats and production needs",
                  "Habitaciones, formatos y producción",
                ),
                copy(
                  "Airport arrivals, guest movement and hospitality",
                  "Llegadas, movimientos y hospitalidad",
                ),
                copy(
                  "Budget, approval process and operational responsibilities",
                  "Presupuesto, aprobaciones y responsabilidades",
                ),
              ].map(x => (
                <li key={x.en}>{x[locale]}</li>
              ))}
            </ul>
          </section>
          <Process locale={locale} />
          <section className="pc-shell pc-section">
            <h2>{es ? "Capacidades relacionadas" : "Related capabilities"}</h2>
            <div className="pc-content-grid" style={{ marginTop: 30 }}>
              {capabilities
                .filter(c =>
                  [
                    "strategy-planning",
                    "event-production",
                    "transportation-logistics",
                  ].includes(c.slug),
                )
                .map(c => (
                  <article className="pc-content-card" key={c.slug}>
                    <h3>{c.title[locale]}</h3>
                    <p>{c.summary[locale]}</p>
                    <Link
                      href={`${p}/what-we-do/${c.slug}`}
                      className="pc-text-link"
                    >
                      {es ? "Ver capacidad" : "View capability"} ↗
                    </Link>
                  </article>
                ))}
            </div>
          </section>
        </>
      )}
      {path === "destinations" && (
        <section className="pc-section pc-shell">
          <div className="pc-content-grid">
            {destinations.map(d => (
              <article className="pc-content-card" key={d}>
                <h2>{d}</h2>
                <p>
                  {es
                    ? "Evaluamos la combinación de venues, alojamiento, accesos y proveedores según las necesidades del evento."
                    : "We assess venues, accommodation, access and suppliers against the event requirements."}
                </p>
                {["Punta Cana", "Santo Domingo"].includes(d) ? (
                  <Link
                    className="pc-text-link"
                    href={`${p}/destinations/${d.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    {es ? "Explorar destino" : "Explore destination"} ↗
                  </Link>
                ) : (
                  <RfpLink locale={locale} secondary source="destinations">
                    {es ? "Consultar el proyecto" : "Discuss your project"}
                  </RfpLink>
                )}
              </article>
            ))}
          </div>
          <p className="pc-lead">
            {es
              ? "La recomendación depende de las fechas, el formato, los requerimientos técnicos y la logística. Confirmamos viabilidad y disponibilidad para cada proyecto."
              : "The recommendation depends on dates, format, technical requirements and logistics. We confirm feasibility and availability for each project."}
          </p>
        </section>
      )}
      {path.startsWith("destinations/") && (
        <>
          <div className="pc-shell pc-editorial">
            <ConceptImage
              locale={locale}
              name="operations"
              alt={
                es
                  ? "Concepto de operación de eventos en destino"
                  : "Destination event operations concept"
              }
            />
            <div className="pc-editorial-copy">
              <h2>
                {es
                  ? "El destino al servicio del programa."
                  : "The destination serves the program."}
              </h2>
              <p style={{ marginTop: 25 }}>
                {path.endsWith("punta-cana")
                  ? es
                    ? "Para conferencias, reuniones anuales e incentivos, evaluamos el programa completo: hoteles, espacios de reunión, montaje técnico, llegadas y eventos fuera del hotel."
                    : "For conferences, annual meetings and incentives, we assess the whole program: hotels, meeting space, technical production, arrivals and off-site events."
                  : es
                    ? "Para reuniones y conferencias en Santo Domingo, planificamos la relación entre el hotel, el venue y los desplazamientos. Los tiempos de traslado se confirman para cada itinerario."
                    : "For meetings and conferences in Santo Domingo, we plan the relationship between hotel, venue and guest movement. Transfer timings are confirmed for each itinerary."}
              </p>
              <Link
                className="pc-text-link"
                href={`${p}/venues?search=${path.endsWith("punta-cana") ? "Punta%20Cana" : "Santo%20Domingo"}`}
              >
                {es ? "Explorar venues" : "Explore venues"} ↗
              </Link>
            </div>
          </div>
          <section className="pc-section pc-shell pc-split">
            <h2>
              {es
                ? "Qué revisamos antes de recomendar."
                : "What we review before recommending."}
            </h2>
            <ul className="pc-scope">
              {[
                copy(
                  "Meeting space, breakout needs and room blocks",
                  "Espacios de reunión, sesiones paralelas y habitaciones",
                ),
                copy(
                  "Airport arrivals, vehicle routing and venue access",
                  "Llegadas, rutas de vehículos y accesos",
                ),
                copy(
                  "Production footprint, loading, power and vendor policies",
                  "Espacio de producción, carga, energía y proveedores",
                ),
                copy(
                  "Weather backup, hospitality and guest experience",
                  "Alternativa climática, hospitalidad y experiencia de asistentes",
                ),
              ].map(x => (
                <li key={x.en}>{x[locale]}</li>
              ))}
            </ul>
          </section>
        </>
      )}
      {path === "for-agencies" && (
        <>
          <section className="pc-shell pc-section pc-split">
            <div>
              <h2>
                {es
                  ? "Tu marca al frente. Un equipo local detrás."
                  : "Your brand in front. A local team behind it."}
              </h2>
              <p className="pc-lead">
                {es
                  ? "Podemos operar bajo tu marca, con marca PCVC o mediante un modelo híbrido. Acordamos responsabilidades y canales de comunicación desde el inicio."
                  : "We can operate under your brand, with PCVC branding or through a hybrid model. Responsibilities and communication channels are agreed from the outset."}
              </p>
            </div>
            <ul className="pc-scope">
              {[
                copy(
                  "White-label local event management and representation",
                  "Gestión y representación local white-label",
                ),
                copy(
                  "Venue sourcing, suppliers, production and fabrication",
                  "Selección de venues, proveedores, producción y fabricación",
                ),
                copy(
                  "Transportation, staffing, hotel coordination and guest logistics",
                  "Transporte, personal, hoteles y logística de asistentes",
                ),
                copy(
                  "On-site execution and troubleshooting",
                  "Ejecución en sitio y resolución de imprevistos",
                ),
              ].map(x => (
                <li key={x.en}>{x[locale]}</li>
              ))}
            </ul>
          </section>
          <section className="pc-dark">
            <div className="pc-shell pc-section">
              <h2>
                {es
                  ? "La relación con tu cliente se respeta."
                  : "Your client relationship stays yours."}
              </h2>
              <p className="pc-lead">
                {es
                  ? "Podemos trabajar bajo NDA y requisitos de confidencialidad. Respetamos la titularidad de la relación comercial, el modelo de comunicación acordado y no captamos directamente a tus clientes."
                  : "We can work under NDA and confidentiality requirements. We respect client ownership and the agreed communication structure, and do not solicit your clients directly."}
              </p>
            </div>
          </section>
          <section className="pc-shell pc-section">
            <h2>
              {es
                ? "Comparte el brief de tu agencia."
                : "Share your agency’s brief."}
            </h2>
            <div style={{ marginTop: 35 }}>
              <RfpForm locale={locale} sourcePage="for-agencies" />
            </div>
          </section>
        </>
      )}
      {path === "about" && (
        <>
          <Founder locale={locale} full />
          <section className="pc-dark">
            <div className="pc-shell pc-section pc-split">
              <div>
                <p className="pc-eyebrow">
                  {es
                    ? "EL EQUIPO DETRÁS DEL PROYECTO"
                    : "THE TEAM BEHIND THE PROJECT"}
                </p>
                <h2>
                  {es
                    ? "Una red especializada. Una dirección común."
                    : "Specialist expertise. One project direction."}
                </h2>
              </div>
              <div>
                <p>
                  {es
                    ? "El equipo de coordinación de PCVC trabaja con directores de proyecto, profesionales de producción y proveedores especializados. Para cada evento configuramos el equipo según las necesidades técnicas y operativas."
                    : "PCVC’s coordination team works with project managers, production professionals and specialist suppliers. For each event, we assemble a team around the technical and operational requirements."}
                </p>
                <p>
                  {es
                    ? "La red incluye AV, transporte, fabricación, impresión, venues, entretenimiento y equipos técnicos. Nuestro papel es conectar su trabajo mediante un presupuesto, cronograma y dirección de proyecto comunes."
                    : "The network includes AV, transportation, fabrication, printing, venues, entertainment and technical crews. Our role is to connect their work through a shared budget, schedule and project direction."}
                </p>
              </div>
            </div>
          </section>
          <Process locale={locale} />
        </>
      )}
      {["submit-rfp", "start-project", "contact"].includes(path) && (
        <section className="pc-shell pc-form-wrap">
          <aside>
            <h2 style={{ fontSize: 32 }}>
              {es ? "Un brief. Un equipo." : "One brief. One team."}
            </h2>
            <p style={{ marginTop: 24 }}>
              {es
                ? "Revisaremos los objetivos y requisitos operativos para definir los siguientes pasos. No necesitas tener elegido el venue ni todos los detalles cerrados."
                : "We will review the objectives and operating requirements to define the next steps. You do not need to have chosen a venue or finalized every detail."}
            </p>
            <a
              className="pc-text-link"
              href="mailto:info@puntacanavenuecollection.com"
            >
              {es ? "Escríbenos directamente" : "Email our team"} ↗
            </a>
            <p style={{ marginTop: 24 }}>
              <a href="tel:+18494520971">+1 849 452 0971</a>
            </p>
            {path !== "submit-rfp" && (
              <Link className="pc-text-link" href={`${p}/submit-rfp`}>
                {es
                  ? "¿Tienes un RFP? Comparte tu brief"
                  : "Have an RFP? Share your brief"}{" "}
                ↗
              </Link>
            )}
          </aside>
          <RfpForm
            locale={locale}
            compact={path !== "submit-rfp"}
            sourcePage={path}
          />
        </section>
      )}
      {path === "our-work" && (
        <section className="pc-shell pc-section">
          <div className="pc-empty">
            <h2>
              {es
                ? "Hablemos del alcance de tu proyecto."
                : "Let’s discuss your project scope."}
            </h2>
            <p className="pc-lead">
              {es
                ? "Podemos explicar el proceso de planificación y ejecución según tus requisitos. Los ejemplos visuales de servicios están identificados como imágenes conceptuales; no representan eventos realizados por PCVC."
                : "We can walk through the planning and delivery approach for your requirements. Service visuals are labeled as conceptual imagery; they do not represent events delivered by PCVC."}
            </p>
            <RfpLink locale={locale} />
          </div>
        </section>
      )}
      {!["submit-rfp", "start-project", "contact", "for-agencies"].includes(
        path,
      ) && <Closing locale={locale} />}
    </div>
  )
}
