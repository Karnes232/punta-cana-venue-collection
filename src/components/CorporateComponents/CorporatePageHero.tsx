import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"

interface Props {
  image?: HeroImage | null
  eyebrow: string
  title: string
  description: string
  primaryLabel: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CorporatePageHero({
  image,
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref = "#venue-proposal",
  secondaryLabel,
  secondaryHref = "/venues",
}: Props) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-charcoal text-white">
      {image?.asset?.url && (
        <Image
          src={image.asset.url}
          alt={image.alt || title}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/25" aria-hidden />
      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-28">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-golden">{eyebrow}</p>
          <h1 className="mt-5 font-hero-display text-5xl font-bold leading-[0.95] md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 md:text-xl">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-golden px-6 py-3.5 font-semibold text-charcoal transition hover:bg-golden/85">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryLabel && (
              <Link href={secondaryHref} className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3.5 font-semibold transition hover:bg-white hover:text-charcoal">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
