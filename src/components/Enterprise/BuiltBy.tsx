import Image from "next/image"
import { Locale } from "@/lib/enterprise"

export default function BuiltBy({ locale }: { locale: Locale }) {
  const es = locale === "es",
    url = `https://www.dr-webstudio.com/${es ? "es" : "en"}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: es
      ? "Atribución del desarrollo del sitio web"
      : "Website build attribution",
    inLanguage: es ? "es" : "en",
    creator: {
      "@type": "Organization",
      "@id": "https://www.dr-webstudio.com/#organization",
      name: "DR Web Studio",
      url,
    },
  }
  return (
    <p className="pc-built-by">
      {es
        ? "Sitio web diseñado y desarrollado por"
        : "Website designed & developed by"}
      <a href={url} target="_blank" rel="noopener">
        <Image
          src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
          alt=""
          width={17}
          height={16}
          loading="lazy"
        />
        DR Web Studio
      </a>
      <script
        id="dr-webstudio-builtby-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </p>
  )
}
