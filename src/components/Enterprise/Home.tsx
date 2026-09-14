import Link from "next/link"
import Founder from "./Founder"
import Image from "next/image"
import { capabilities, eventTypes, Locale, prefix } from "@/lib/enterprise"
import {
  Capabilities,
  Closing,
  ConceptImage,
  Process,
  RfpLink,
} from "./Sections"

export default function Home({ locale }: { locale: Locale }) {
  const es = locale === "es",
    p = prefix(locale)
  return (
    <div className="pc-enterprise">
      <section className="pc-hero">
        <Image
          src="/images/corporate/conference.webp"
          alt={
            es
              ? "Concepto de conferencia corporativa con escenario LED y asistentes profesionales"
              : "Concept of a corporate conference with LED stage and professional attendees"
          }
          fill
          priority
          sizes="100vw"
          quality={75}
        />
        <div className="pc-hero-shade" />
        <div className="pc-shell pc-hero-content">
          <p className="pc-eyebrow">
            {es
              ? "ESTRATEGIA · PRODUCCIÓN · OPERACIÓN EN DESTINO"
              : "STRATEGY · PRODUCTION · DESTINATION OPERATIONS"}
          </p>
          <h1>
            {es ? (
              <>
                Tu evento corporativo.
                <br />
                <em>Toda la operación.</em>
              </>
            ) : (
              <>
                Your corporate event.
                <br />
                <em>The entire operation.</em>
              </>
            )}
          </h1>
          <p className="pc-hero-sub">
            {es
              ? "Planificamos, producimos y operamos grandes eventos corporativos en República Dominicana."
              : "We plan, produce & operate large corporate events in the Dominican Republic."}
          </p>
          <p className="pc-hero-detail">
            {es
              ? "Del venue y el diseño a la producción audiovisual, los stands, el transporte y la ejecución en sitio. Un equipo local responsable del proyecto completo."
              : "From venue strategy and event design to audiovisual production, exhibitions, transportation and on-site execution. One accountable local team for the complete project."}
          </p>
          <div className="pc-actions">
            <RfpLink locale={locale} source="hero" />
            <Link className="pc-hero-link" href={`${p}/what-we-do`}>
              {es ? "Explorar capacidades" : "Explore Our Capabilities"} ↗
            </Link>
          </div>
          <Link href={`${p}/venues`} className="pc-hero-tertiary">
            {es ? "Explorar venues corporativos" : "Explore Corporate Venues"} →
          </Link>
        </div>
        <span className="pc-hero-caption">
          {es
            ? "Imagen conceptual · Generada con IA"
            : "Conceptual imagery · AI-generated"}
        </span>
        <div className="pc-hero-bottom">
          <span>DOMINICAN REPUBLIC</span>
          <span>
            {es
              ? "DEL CONCEPTO AL DESMONTAJE FINAL"
              : "FROM CONCEPT TO FINAL BREAKDOWN"}
          </span>
        </div>
      </section>
      <section className="pc-section pc-shell">
        <div className="pc-split">
          <p className="pc-eyebrow">
            {es
              ? "UN EQUIPO. UN PROYECTO. UNA RESPONSABILIDAD."
              : "ONE TEAM. ONE PROJECT. ONE RESPONSIBILITY."}
          </p>
          <div>
            <h2>
              {es
                ? "Un brief. Un equipo. Ejecución completa."
                : "One brief. One team. Complete execution."}
            </h2>
            <p className="pc-lead">
              {es
                ? "Comparte tus objetivos, las fechas y el número aproximado de asistentes. Nuestro equipo desarrolla la estrategia del venue, dirección creativa, producción, logística y operación que necesita tu evento."
                : "Share your objectives, dates and approximate attendance. Our team develops the venue strategy, creative direction, production plan, logistics and complete operation your event needs."}
            </p>
          </div>
        </div>
        <div
          className="pc-flow"
          aria-label={
            es
              ? "Planificamos, seleccionamos, diseñamos, producimos y operamos"
              : "Plan, source, design, produce, operate"
          }
        >
          {(es
            ? [
                "Planificamos",
                "Seleccionamos",
                "Diseñamos",
                "Producimos",
                "Operamos",
              ]
            : ["Plan", "Source", "Design", "Produce", "Operate"]
          ).map((s, i) => (
            <span key={s}>
              <small>0{i + 1}</small>
              {s}
              <b aria-hidden="true">↗</b>
            </span>
          ))}
        </div>
      </section>
      <section className="pc-dark">
        <div className="pc-section pc-shell">
          <div className="pc-section-heading">
            <p className="pc-eyebrow">
              {es ? "CAPACIDAD OPERATIVA" : "THE CAPABILITIES BEHIND THE EVENT"}
            </p>
            <h2>
              {es
                ? "Cada detalle. Un mismo plan."
                : "Every detail. One connected plan."}
            </h2>
            <p>
              {es
                ? "Diseño, producción y logística trabajan juntos desde el inicio."
                : "Design, production and logistics work together from the start."}
            </p>
          </div>
          <Capabilities locale={locale} />
        </div>
      </section>
      <section className="pc-section pc-shell">
        <div className="pc-section-heading">
          <p className="pc-eyebrow">
            {es ? "EVENTOS CORPORATIVOS" : "CORPORATE EVENTS"}
          </p>
          <h2>{es ? "¿Qué estás organizando?" : "What are you planning?"}</h2>
        </div>
        <div className="pc-events">
          {eventTypes.map((e, i) => (
            <Link href={`${p}/corporate-events/${e.slug}`} key={e.slug}>
              <span className="pc-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{e.title[locale]}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="pc-shell pc-editorial">
        <ConceptImage
          locale={locale}
          name="production"
          alt={
            es
              ? "Montaje conceptual de producción y escenario"
              : "Conceptual production and stage setup"
          }
        />
        <div className="pc-editorial-copy">
          <p className="pc-eyebrow">
            {es ? "DE LA IDEA A LA EJECUCIÓN" : "FROM STRATEGY TO SHOW DAY"}
          </p>
          <h2>
            {es
              ? "Producción que responde al proyecto."
              : "Production built around the project."}
          </h2>
          <p>
            {es
              ? "Escenarios, LED, audio, iluminación y estructuras. Coordinamos el diseño técnico, los proveedores, la instalación y los ensayos para que cada equipo llegue preparado."
              : "Stages, LED, audio, lighting and structures. We coordinate technical design, suppliers, installation and rehearsals so every team arrives prepared."}
          </p>
          <Link
            className="pc-text-link"
            href={`${p}/what-we-do/event-production`}
          >
            {es ? "Explorar producción" : "Explore event production"} ↗
          </Link>
        </div>
      </section>
      <section className="pc-section pc-shell">
        <div className="pc-split">
          <div>
            <p className="pc-eyebrow">
              {es ? "UNA OPERACIÓN INTEGRADA" : "ONE EVENT OPERATION"}
            </p>
            <h2>
              {es
                ? "Toda la complejidad. Un punto de contacto."
                : "All the moving parts. One point of contact."}
            </h2>
          </div>
          <div className="pc-operation">
            {(es
              ? [
                  "Hotel",
                  "Venue",
                  "Producción",
                  "Transporte",
                  "Branding",
                  "Registro",
                  "Entretenimiento",
                  "Hospitalidad",
                  "Logística",
                ]
              : [
                  "Hotel",
                  "Venue",
                  "Production",
                  "Transportation",
                  "Branding",
                  "Registration",
                  "Entertainment",
                  "Hospitality",
                  "Logistics",
                ]
            ).map(x => (
              <span key={x}>{x}</span>
            ))}
            <strong>
              {es ? "UN EQUIPO RESPONSABLE" : "ONE ACCOUNTABLE TEAM"}
            </strong>
          </div>
        </div>
      </section>
      <Process locale={locale} />
      <section className="pc-destination pc-dark">
        <div className="pc-shell pc-section pc-split">
          <div>
            <p className="pc-eyebrow">
              {es
                ? "CONOCIMIENTO LOCAL. ALCANCE NACIONAL."
                : "LOCAL KNOWLEDGE. NATIONAL REACH."}
            </p>
            <h2>
              {es
                ? "República Dominicana, como parte de tu estrategia."
                : "The Dominican Republic, as part of your strategy."}
            </h2>
          </div>
          <div>
            <p>
              {es
                ? "Punta Cana es una de nuestras bases estratégicas. Coordinamos proyectos en todo el país, definiendo destino, venues y operación según los objetivos del programa."
                : "Punta Cana is a strategic base. We coordinate projects across the country, aligning destination, venues and operations with the objectives of the program."}
            </p>
            <div className="pc-destinations">
              <Link href={`${p}/destinations/punta-cana`}>Punta Cana ↗</Link>
              <Link href={`${p}/destinations/santo-domingo`}>
                Santo Domingo ↗
              </Link>
              <Link href={`${p}/destinations`}>
                {es ? "Explorar destinos" : "Explore destinations"} ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Founder locale={locale} />
      <section className="pc-agency pc-shell">
        <p className="pc-eyebrow">
          {es ? "PARA AGENCIAS INTERNACIONALES" : "FOR INTERNATIONAL AGENCIES"}
        </p>
        <h2>
          {es
            ? "Tu cliente. Nuestra operación local."
            : "You own the client. We operate the Dominican Republic."}
        </h2>
        <Link className="pc-text-link" href={`${p}/for-agencies`}>
          {es
            ? "Explorar colaboración con agencias"
            : "Explore agency partnerships"}{" "}
          ↗
        </Link>
      </section>
      <Closing locale={locale} />
    </div>
  )
}
