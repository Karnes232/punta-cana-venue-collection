import BlockContent from "@/components/BlockContent/BlockContent"
import HomePageClient from "./HomePageClient"
import HomePageMapSection from "./HomePageMapSection"

export interface MainPageContentProps {
  mainPage: any
  locale: "en" | "es"
  typeVenue: any
  searchVenues: any
  venues: any
  popupVenues: any
  calendlyUrls: any
}

export default function MainPageContent({
  mainPage,
  locale,
  typeVenue,
  searchVenues,
  venues,
  popupVenues,
  calendlyUrls,
}: MainPageContentProps) {
  return (
    <section className="">
      <HomePageClient
        mainPage={mainPage}
        locale={locale}
        typeVenue={typeVenue}
        searchVenues={searchVenues}
        popupVenues={popupVenues}
        calendlyUrls={calendlyUrls}
      />

      <div className="z-0 mx-auto mt-4 flex max-w-7xl flex-col gap-4 px-4 lg:flex-row-reverse">
        <HomePageMapSection venues={venues} height={400} />
        <div className="h-full w-full overflow-hidden rounded-2xl xl:w-1/2">
          <BlockContent content={mainPage.introduction} language={locale} />
        </div>
      </div>
    </section>
  )
}
