"use client"
import Image from "next/image"
import React, { useState } from "react"
import { Lightbox } from "yet-another-react-lightbox"
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { useTranslations } from "next-intl"

const IndividualVenuePhotoGrid = ({ gallery }: { gallery: any }) => {
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[400px] xl:h-[500px]">
        {/* Main large photo - takes up 2 columns on large screens */}
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
              priority
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

            {/* Photo counter badge */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {gallery.length} {t("photos")}
              {gallery.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Right side photos grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {gallery.slice(1, 5).map((photo: any, index: number) => {
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
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                  {/* "View More" overlay for last photo */}
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

          {/* Fill empty spaces if less than 4 additional photos */}
          {gallery.length <= 4 &&
            Array.from({ length: 4 - (gallery.length - 1) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl opacity-30"
              />
            ))}
        </div>
      </div>

      {/* Enhanced Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={gallery.map((photo: any) => ({
          src: photo.asset.url,
          alt: photo.alt || "Venue photo",
          width: photo.asset.metadata.dimensions.width,
          height: photo.asset.metadata.dimensions.height,
        }))}
        render={{
          slide: NextJsImage,
        }}
        index={currentIndex}
        controller={{ closeOnBackdropClick: true }}
        carousel={{
          finite: false,
          preload: 2,
        }}
        animation={{
          fade: 300,
          swipe: 500,
        }}
      />
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
