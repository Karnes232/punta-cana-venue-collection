import React, { useState } from "react"
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

const HeroComponentVenuePage = ({
  heroImage,
  heroTitle,
  onSearch,
}: {
  heroImage: HeroImage
  heroTitle: string
  onSearch: (searchTerm: string) => void
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const {
    props: { srcSet },
  } = getImageProps({
    alt: heroImage.alt,
    width: 1000,
    height: 1000,
    src: heroImage.asset.url,
  })
  const backgroundImage = getBackgroundImage(srcSet)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value) // Real-time search as user types
  }

  return (
    <main
      className="w-full h-[75vh] lg:h-[40rem] relative"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold z-10 text-center px-4">
        <h1
          className={`${coromantGaramond.className} font-bold text-5xl md:text-7xl text-shadow-lg max-w-4xs md:max-w-lg mb-8`}
        >
          {heroTitle}
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search Venues..."
              className="w-full px-6 py-4 text-lg text-gray-900 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white transition-all duration-300 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-golden/50 to-golden/90 hover:from-golden/70 hover:to-golden text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default HeroComponentVenuePage
