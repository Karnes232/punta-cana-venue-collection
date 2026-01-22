"use client"

import Image from "next/image"
import React, { useState } from "react"
import { Lightbox } from "yet-another-react-lightbox"
import Video from "yet-another-react-lightbox/plugins/video"
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { useTranslations } from "next-intl"

type SanityImage = {
  alt?: string
  asset: {
    url: string
    mimeType?: string
    metadata: {
      dimensions: { width: number; height: number }
      lqip?: string
    }
  }
}

const mimeFromUrl = (url: string) => {
  const ext = url.split("?")[0].split("#")[0].split(".").pop()?.toLowerCase()
  if (ext === "mp4") return "video/mp4"
  if (ext === "webm") return "video/webm"
  if (ext === "ogv" || ext === "ogg") return "video/ogg"
  return "video/mp4"
}

const IndividualVenuePhotoGrid = ({
  gallery,
  videoGallery,
}: {
  gallery: SanityImage[]
  videoGallery?: string[]
}) => {
  const t = useTranslations("individualVenueListing")
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({})

  const handlePhotoClick = (index: number) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }

  if (!gallery || gallery.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <div className="text-center text-gray-500">
          {t("noPhotosAvailable")}
        </div>
      </div>
    )
  }

  // Build slides: images first, then videos (if any)
  const imageSlides = gallery.map(photo => ({
    src: photo.asset.url,
    alt: photo.alt || "Venue photo",
    width: photo.asset.metadata.dimensions.width,
    height: photo.asset.metadata.dimensions.height,
    blurDataURL: photo.asset.metadata?.lqip,
  }))

  const videoSlides = Array.isArray(videoGallery)
    ? videoGallery.map(url => ({
        type: "video" as const,
        width: 1920,
        height: 1080,
        // poster: "/optional-poster.jpg",
        sources: [{ src: url, type: mimeFromUrl(url) }],
      }))
    : []

  const slides = [...imageSlides, ...videoSlides]

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[400px] xl:h-[500px]">
        {/* Main large photo */}
        <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
          <div
            className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full bg-gray-100"
            onClick={() => handlePhotoClick(0)}
          >
            <Image
              width={gallery[0].asset.metadata.dimensions.width}
              height={gallery[0].asset.metadata.dimensions.height}
              src={gallery[0].asset.url}
              alt={gallery[0].alt || "Venue photo"}
              className={`w-full h-full object-cover cursor-pointer transition-all duration-700 group-hover:scale-105 ${
                imageLoaded[0] ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => handlePhotoClick(0)}
              onLoad={() => handleImageLoad(0)}
              loading="lazy"
              quality={80}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {gallery.length} {t("photos")}
              {gallery.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Right-side grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {gallery.slice(1, 5).map((photo, index) => {
            const actualIndex = index + 1
            const isLastVisible = actualIndex === 4 && gallery.length > 5

            return (
              <div
                key={actualIndex}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div
                  className="relative w-full h-32 sm:h-36 md:h-48 lg:h-[200px] xl:h-[240px] bg-gray-100"
                  onClick={() => handlePhotoClick(actualIndex)}
                >
                  <Image
                    width={photo.asset.metadata.dimensions.width}
                    height={photo.asset.metadata.dimensions.height}
                    src={photo.asset.url}
                    alt={photo.alt || `Venue photo ${actualIndex + 1}`}
                    className={`w-full h-full object-cover cursor-pointer transition-all duration-700 group-hover:scale-110 ${
                      isLastVisible ? "brightness-50" : ""
                    } ${imageLoaded[actualIndex] ? "opacity-100" : "opacity-0"}`}
                    onClick={() => handlePhotoClick(actualIndex)}
                    onLoad={() => handleImageLoad(actualIndex)}
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  {isLastVisible && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center text-white cursor-pointer group-hover:bg-black/20 transition-all duration-300"
                      onClick={() => handlePhotoClick(actualIndex)}
                    >
                      <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl sm:text-3xl font-bold mb-1">
                          +{gallery.length - 4}
                        </div>
                        <div className="text-sm sm:text-base font-medium opacity-90">
                          {t("viewAllPhotos")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Fillers if less than 5 total images */}
          {gallery.length <= 4 &&
            Array.from({ length: 4 - (gallery.length - 1) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl opacity-30"
              />
            ))}
        </div>
      </div>

      {/* Lightbox (images + videos) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        plugins={[Video]}
        slides={slides}
        render={{ slide: NextJsImage }} // Only renders for image slides; video plugin handles videos
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: false, preload: 2 }}
        animation={{ fade: 300, swipe: 500 }}
        video={{
          controls: true,
          playsInline: true,
          preload: "metadata",
          autoPlay: true,
          muted: true, // required if you enable autoplay
          loop: true,
        }}
      />

      {/* Optional: button to open the first video directly */}
      {Array.isArray(videoGallery) && videoGallery.length > 0 && (
        <div className="mt-4">
          <button
            className="px-4 py-2 rounded-xl bg-gradient-to-br from-golden/50 to-golden/90 text-charcoal hover:bg-golden transition-colors cursor-pointer"
            onClick={() => {
              // First video index is after all images
              setCurrentIndex(imageSlides.length)
              setOpen(true)
            }}
          >
            {t("viewVideos")}
          </button>
        </div>
      )}
    </div>
  )
}

export default IndividualVenuePhotoGrid

function isNextJsImage(slide: any) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  )
}

function NextJsImage({
  slide,
  offset,
  rect,
}: {
  slide: any
  offset: any
  rect: any
}) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps()

  const { currentIndex } = useLightboxState()
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  // Let the Video plugin render non-image slides
  if (!isNextJsImage(slide)) return undefined

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height

  return (
    <div
      className="rounded-2xl xl:rounded-4xl overflow-hidden"
      style={{ position: "relative", width, height }}
    >
      <Image
        fill
        alt={slide.alt || ""}
        src={slide.src}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  )
}
