import React from "react"
import { getImageProps } from "next/image"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map(str => {
      const [url, dpi] = str.split(" ")
      return `url("${url}") ${dpi}`
    })
    .join(", ")
  return `image-set(${imageSet})`
}

const HeroComponentIndividualVenue = ({
  heroImage,
  heroTitle,
  locale,
}: {
  heroImage: Omit<HeroImage, "alt"> & {
    alt?: string | { en?: string; es?: string }
  }
  heroTitle: string
  locale: "en" | "es"
}) => {
  const imageAlt =
    typeof heroImage.alt === "string"
      ? heroImage.alt
      : heroImage.alt?.[locale] || heroTitle
  const {
    props: { srcSet },
  } = getImageProps({
    alt: imageAlt,
    width: 1000,
    height: 1000,
    src: heroImage.asset.url,
  })
  const backgroundImage = getBackgroundImage(srcSet)

  return (
    <main
      className="w-full h-[30vh] lg:h-[40rem] relative"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      <div className="absolute inset-0 flex items-center justify-center text-white  font-bold z-10 text-center">
        <h1 className="font-hero-display font-bold text-5xl md:text-7xl text-shadow-lg max-w-4xs md:max-w-xl">
          {heroTitle}
        </h1>
      </div>
    </main>
  )
}

export default HeroComponentIndividualVenue
