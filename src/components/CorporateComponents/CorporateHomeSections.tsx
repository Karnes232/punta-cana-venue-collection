import Link from "next/link"
import { ArrowRight, Building2, CheckCircle2, MapPinned } from "lucide-react"
import CorporateProposalForm from "./CorporateProposalForm"
import { corporateIntents, homeCorporateCopy, Locale } from "@/lib/corporateContent"

export default function CorporateHomeSections({ locale }: { locale: Locale }) {
  const copy = homeCorporateCopy[locale]
  const prefix = locale === "es" ? "/es" : ""

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-labelledby="corporate-programs-title">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-golden">{copy.planningEyebrow}</p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <h2 id="corporate-programs-title" className="font-hero-display text-4xl leading-tight text-charcoal md:text-6xl">
            {copy.planningTitle}
          </h2>
          <p className="text-lg leading-8 text-charcoal/70">{copy.planningIntro}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {corporateIntents.map(intent => (
            <Link
              key={intent.slug}
              href={`${prefix}/corporate-venues/${intent.slug}`}
              className="group rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-golden/60 hover:shadow-md"
            >
              <Building2 className="h-7 w-7 text-golden" aria-hidden />
              <h3 className="mt-5 font-hero-display text-3xl text-charcoal">{intent.title[locale]}</h3>
              <p className="mt-3 leading-7 text-charcoal/70">{intent.shortDescription[locale]}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
                {locale === "es" ? "Ver opciones" : "Explore options"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-white" aria-labelledby="corporate-process-title">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-golden">{copy.processEyebrow}</p>
          <h2 id="corporate-process-title" className="mt-3 max-w-4xl font-hero-display text-4xl leading-tight md:text-6xl">
            {copy.processTitle}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.processSteps.map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <CheckCircle2 className="h-6 w-6 text-turquoise" aria-hidden />
                <h3 className="mt-5 font-hero-display text-2xl">{title}</h3>
                <p className="mt-3 leading-7 text-white/70">{description}</p>
              </article>
            ))}
          </div>
          <Link
            href={`${prefix}/inspection`}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:border-turquoise hover:text-turquoise"
          >
            <MapPinned className="h-5 w-5" />
            {locale === "es" ? "Coordinar una inspección de venues" : "Coordinate a venue site inspection"}
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:py-20 lg:grid-cols-[0.65fr_1fr] lg:items-start">
        <div className="lg:sticky lg:top-36">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-golden">{copy.formEyebrow}</p>
          <h2 className="mt-3 font-hero-display text-4xl leading-tight text-charcoal md:text-6xl">{copy.formTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-charcoal/70">{copy.formIntro}</p>
        </div>
        <CorporateProposalForm locale={locale} sourcePage="home" />
      </section>
    </>
  )
}
