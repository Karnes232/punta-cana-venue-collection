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
import { getLogo } from "@/sanity/queries/GeneralLayout/GeneralLayout"
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
  metadataBase: new URL("https://www.grandbay-puntacana.com"),
  openGraph: {
    siteName: "Grand Bay of the Sea",
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
  applicationName: "Grand Bay of the Sea",
  appleWebApp: {
    title: "Grand Bay of the Sea",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "QNQfgD0iQIbuHkuZ5fb8hKEYbV6iCN_TvIyRdnAu7yg",
    // yandex: ["YOUR_DATA"],
    other: {
      "google-site-verification": [
        "_73Leg9k9ryZXyP10IC8Nb2dxu3mfjpQG_zxN69KQCs",
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
    <html lang={locale} className={`${crimsonPro.variable}`}>
      {/* <GoogleTagManager gtmId="GTM-KGLHKQW" />
      <GoogleAnalytics gaId="G-6MJLJ90SSM" />
      <GoogleAnalytics gaId="G-JDL6KCYRYD" /> */}
      <head>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          key={locale}
        >
          <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar logo={logo.logo.asset.url} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
