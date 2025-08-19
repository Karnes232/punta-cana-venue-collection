import React from "react"
import { getImageProps } from "next/image"
import { HeroImage } from "@/sanity/queries/MainPage/MainPage"
import { Cormorant_Garamond } from "next/font/google"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

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

const HeroComponentBlog = ({
  heroImage,
  heroTitle,
}: {
  heroImage: HeroImage
  heroTitle: string
}) => {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: heroImage.alt,
    width: 1000,
    height: 1000,
    src: heroImage.asset.url,
  })
  const backgroundImage = getBackgroundImage(srcSet)

  return (
    <main
      className="w-full h-[30vh] lg:h-[15rem] 2xl:h-[20rem] relative"
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
        <h1
          className={`${coromantGaramond.className} font-bold text-5xl md:text-7xl text-shadow-lg max-w-4xs md:max-w-xl`}
        >
          {heroTitle}
        </h1>
      </div>
    </main>
  )
}

export default HeroComponentBlog
