import type { Metadata } from "next"
import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google"
import "../../globals.css"

//import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
//import { generateStructuredData } from "@/components/StructuredData/StructuredData"

import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import Footer from "@/components/layout/FooterComponents/Footer"
import Navbar from "@/components/layout/HeaderComponents/Navbar"
import {
  getCompanyInfo,
  getLogo,
} from "@/sanity/queries/GeneralLayout/GeneralLayout"
import CookieConsentComponent from "@/components/CookieConsentComponents/CookieConsentComponent"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crimson-pro",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.puntacanavenues.com"),
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
  // alternates: {
  //   types: {
  //     "application/rss+xml": "https://dminhvu.com/rss.xml"
  //   }
  // },
  applicationName: "Punta Cana Venue Collection",
  appleWebApp: {
    title: "Punta Cana Venue Collection",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "uDTOqd2dqdClXOBUBmAp9LAzWwGZA3xSeLqiHe",
    // // yandex: ["YOUR_DATA"],
    other: {
      "google-site-verification": [
        "z1ceKSK3JVrMz86jtW5n8_lXA88be1zGlh9Kb0lRamg",
      ],
      // "facebook-domain-verification": ["YOUR_DATA"],
    },
  },
  icons: {
    icon: [
      {
        url: "../favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "../favicon.ico",
        type: "image/x-icon",
      },
    ],
    shortcut: [
      {
        url: "../favicon.ico",
        type: "image/x-icon",
      },
    ],
  },
}

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
  const logo = await getLogo()
  const companyInfo = await getCompanyInfo()
  if (!hasLocale(routing.locales, locale)) {
    notFound()
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
      className={`${crimsonPro.variable} light`}
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      {/* <GoogleTagManager gtmId="GTM-KGLHKQW" />
      <GoogleAnalytics gaId="G-6MJLJ90SSM" />
      <GoogleAnalytics gaId="G-JDL6KCYRYD" /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          key={locale}
        >
          <div className="min-h-screen flex flex-col">
            <Navbar
              logo={logo.logo.asset.url}
              email={companyInfo.email}
              telephone={companyInfo.telephone}
            />

            <main className="flex-1">{children}</main>
            <Footer companyInfo={companyInfo} logo={logo.logo.asset.url} />
          </div>
        </NextIntlClientProvider>
        <CookieConsentComponent key={locale} locale={locale} />
      </body>
    </html>
  )
}
