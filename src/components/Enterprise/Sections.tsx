import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  capabilities,
  copy,
  Locale,
  prefix,
  rfpLabel,
  SITE,
  steps,
  stepDescriptions,
} from "@/lib/enterprise"

export function RfpLink({
  locale,
  children,
  secondary = false,
  source = "page",
}: {
  locale: Locale
  children?: React.ReactNode
  secondary?: boolean
  source?: string
}) {
  return (
    <Link
      className={secondary ? "pc-button pc-button-secondary" : "pc-button"}
      href={`${prefix(locale)}/submit-rfp?source=${encodeURIComponent(source)}`}
      data-rfp-cta={source}
    >
      {children || rfpLabel[locale]}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  )
}
export function ConceptImage({
  name,
  alt,
  locale = "en",
  priority = false,
}: {
  name: string
  alt: string
  locale?: Locale
  priority?: boolean
}) {
  return (
    <figure className="pc-image">
      <Image
        src={`/images/corporate/${name}.webp`}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, 75vw"
        quality={75}
        priority={priority}
      />
      <figcaption>
        {
          copy(
            "Conceptual service imagery · AI-generated",
            "Imagen conceptual del servicio · Generada con IA",
          )[locale]
        }
      </figcaption>
    </figure>
  )
}
export function Breadcrumb({
  locale,
  title,
  path,
}: {
  locale: Locale
  title: string
  path: string
}) {
  const items = [
    { name: locale === "es" ? "Inicio" : "Home", url: SITE + prefix(locale) },
    { name: title, url: SITE + prefix(locale) + path },
  ]
  return (
    <>
      <nav
        className="pc-breadcrumb"
        aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"}
      >
        <Link href={prefix(locale) || "/"}>{items[0].name}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((x, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: x.name,
              item: x.url,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  )
}
export function PageIntro({
  locale,
  title,
  description,
  eyebrow,
  path,
}: {
  locale: Locale
  title: string
  description: string
  eyebrow?: string
  path: string
}) {
  return (
    <header className="pc-page-intro pc-shell">
      <Breadcrumb locale={locale} title={title} path={path} />
      <p className="pc-eyebrow">{eyebrow || "PUNTA CANA VENUE COLLECTION"}</p>
      <h1>{title}</h1>
      <p className="pc-lead">{description}</p>
    </header>
  )
}
export function Capabilities({ locale }: { locale: Locale }) {
  return (
    <div className="pc-capabilities">
      {capabilities.map((c, i) => (
        <Link
          href={`${prefix(locale)}/what-we-do/${c.slug}`}
          className="pc-capability"
          key={c.slug}
        >
          <span className="pc-number">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{c.title[locale]}</h3>
            <p>{c.summary[locale]}</p>
          </div>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      ))}
    </div>
  )
}
export function Process({ locale }: { locale: Locale }) {
  return (
    <section className="pc-section pc-shell" id="how-it-works">
      <div className="pc-section-heading">
        <p className="pc-eyebrow">
          {locale === "es" ? "EL PROCESO" : "HOW IT WORKS"}
        </p>
        <h2>
          {locale === "es"
            ? "Complejo por dentro. Sencillo para ti."
            : "Complex behind the scenes. Simple for you."}
        </h2>
      </div>
      <ol className="pc-process">
        {steps.map((s, i) => (
          <li key={s.en}>
            <span className="pc-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s[locale]}</h3>
            <p>{stepDescriptions[i][locale]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
export function Closing({ locale }: { locale: Locale }) {
  return (
    <section className="pc-closing">
      <div className="pc-shell pc-split">
        <div>
          <p className="pc-eyebrow">
            {locale === "es"
              ? "COMENCEMOS POR TU PROYECTO"
              : "LET’S START WITH YOUR PROJECT"}
          </p>
          <h2>
            {locale === "es"
              ? "Tú compartes el brief. Nosotros nos encargamos del resto."
              : "You provide the brief. We handle everything else."}
          </h2>
        </div>
        <div>
          <p>
            {locale === "es"
              ? "Cuéntanos qué estás organizando. Construiremos la operación alrededor de tus objetivos, fechas y requisitos."
              : "Tell us what you’re planning. We’ll build the operation around your objectives, dates and requirements."}
          </p>
          <RfpLink locale={locale} source="closing" />
          <Link
            className="pc-text-link"
            href={`${prefix(locale)}/start-project`}
          >
            {locale === "es"
              ? "¿Aún no tienes RFP? Inicia tu proyecto"
              : "No RFP yet? Start your project"}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
