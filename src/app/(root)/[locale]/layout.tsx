import type { Metadata } from "next"
import Script from "next/script"
import { Cormorant_Garamond } from "next/font/google"
import "../../globals.css"

//import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
//import { generateStructuredData } from "@/components/StructuredData/StructuredData"

import { NextIntlClientProvider, hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import Footer from "@/components/layout/FooterComponents/Footer"
import Navbar from "@/components/layout/HeaderComponents/Navbar"
import ClientEnhancements from "@/components/layout/ClientEnhancements"
import { PCVC_BRAND } from "@/lib/brand"

export const revalidate = 3600

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant-garamond",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://puntacanavenuecollection.com"),
  applicationName: "Punta Cana Venue Collection",
  openGraph: {
    siteName: "Punta Cana Venue Collection",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  appleWebApp: {
    title: "Punta Cana Venue Collection",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico", // or "/favicon.ico"
  },
}

// export const metadata: Metadata = {
//   metadataBase: new URL("https://puntacanavenuecollection.com"),
//   openGraph: {
//     siteName: "Punta Cana Venue Collection",
//     type: "website",
//     locale: "en_US",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     "max-image-preview": "large",
//     "max-snippet": -1,
//     "max-video-preview": -1,
//     googleBot: "index, follow",
//   },
//   // alternates: {
//   //   types: {
//   //     "application/rss+xml": "https://dminhvu.com/rss.xml"
//   //   }
//   // },
//   applicationName: "Punta Cana Venue Collection",
//   appleWebApp: {
//     title: "Punta Cana Venue Collection",
//     statusBarStyle: "default",
//     capable: true,
//   },
//   verification: {
//     // google: "uDTOqd2dqdClXOBUBmAp9LAzWwGZA3xSeLqiHe",
//     // // yandex: ["YOUR_DATA"],
//     // other: {
//     //   "google-site-verification": [
//     //     "z1ceKSK3JVrMz86jtW5n8_lXA88be1zGlh9Kb0lRamg",
//     //   ],
//     //   // "facebook-domain-verification": ["YOUR_DATA"],
//     // },
//   },
//   icons: {
//     icon: [
//       {
//         url: "../favicon.ico",
//         type: "image/x-icon",
//       },
//     ],
//     apple: [
//       {
//         url: "../favicon.ico",
//         type: "image/x-icon",
//       },
//     ],
//     shortcut: [
//       {
//         url: "../favicon.ico",
//         type: "image/x-icon",
//       },
//     ],
//   },
// }

// Add caching headers for better performance
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)
  const organizationId = "https://puntacanavenuecollection.com/#organization"
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: PCVC_BRAND.name,
        url: "https://puntacanavenuecollection.com",
        logo: { "@type": "ImageObject", url: PCVC_BRAND.logo },
        email: PCVC_BRAND.email,
        telephone: PCVC_BRAND.phoneDisplay,
        areaServed: { "@type": "Country", name: "Dominican Republic" },
        knowsLanguage: ["en", "es"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: PCVC_BRAND.phoneDisplay,
          email: PCVC_BRAND.email,
          availableLanguage: ["English", "Spanish"],
          areaServed: "DO",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://puntacanavenuecollection.com/#website",
        url: "https://puntacanavenuecollection.com",
        name: PCVC_BRAND.name,
        inLanguage: ["en", "es"],
        publisher: { "@id": organizationId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://puntacanavenuecollection.com${
              locale === "es" ? "/es" : ""
            }/venues?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }
  // Import messages for the current locale
  let messages
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error)
    // Fallback to English messages
    messages = (await import(`../../../../messages/en.json`)).default
  }

  return (
    <html
      lang={locale}
      className={`${cormorantGaramond.variable} light`}
      style={{ colorScheme: "light" }}
    >
      <head>
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      {/* <GoogleTagManager gtmId="GTM-KGLHKQW" />
      <GoogleAnalytics gaId="G-6MJLJ90SSM" />
      <GoogleAnalytics gaId="G-JDL6KCYRYD" /> */}
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          strategy="lazyOnload"
          data-key="jUgv0m/1x2mKK6MXEmO29g"
        />
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          key={locale}
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <ClientEnhancements
          key={locale}
          locale={locale as "en" | "es"}
          telephone={PCVC_BRAND.telephone}
          email={PCVC_BRAND.email}
        />
      </body>
    </html>
  )
}
