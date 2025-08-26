import React, { useState } from "react"
import { Description } from "@headlessui/react"
import imageCompression from "browser-image-compression"
import Image from "next/image"
import { useTranslations } from "next-intl"
const ImageUploadComponent = ({
  formData,
  setFormData,
}: {
  formData: any
  setFormData: any
}) => {
  const t = useTranslations("RateVenue")
  const [images, setImages] = useState<File[]>([])
  const MAX_IMAGES = 3 // Set maximum number of images allowed
  console.log(images)
  // Function to compress image to WebP format
  const compressImageToWebP = async (file: any) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      fileType: "image/webp", // Convert to WebP
    }
    return await imageCompression(file, options)
  }

  const handleImageUpload = async (e: any) => {
    const selectedFiles = Array.from(e.target.files) as File[]
    const compressedImages: File[] = []

    // Check if adding new files would exceed the limit
    if (images.length + selectedFiles.length > MAX_IMAGES) {
      alert(`You can only upload a maximum of ${MAX_IMAGES} images.`)
      return
    }

    try {
      for (const file of selectedFiles) {
        const compressedFile = await compressImageToWebP(file)
        const originalName = file.name.split(".").slice(0, -1).join(".")
        const newName = `${originalName}.webp` // Change the extension to .webp
        const renamedFile = new File(
          [compressedFile], // File data
          newName, // New file name
          { type: compressedFile.type }, // File type (WebP)
        )
        compressedImages.push(renamedFile)
      }
      setImages(compressedImages)
      setFormData({
        ...formData,
        Images: compressedImages,
      })
    } catch (error) {
      console.error("Error compressing images:", error)
    }
  }
  return (
    <div className="lg:max-w-3xl lg:mx-auto space-y-4">
      <Description className="font-bold text-center text-xl">
        {t("addPhotos")}{" "}
        <span className="font-normal text-base text-gray-400">
          ({t("optional")})
        </span>
      </Description>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{t("clickToUpload")}</span>{" "}
              {t("or")}{" "}
              <span className="font-semibold">{t("dragAndDrop")}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("svgPngJpgGif")} (MAX. 800x400px, {t("upTo")} {MAX_IMAGES}{" "}
              {t("images")})
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            multiple
          />
        </label>
      </div>
      {images.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">{t("uploadedImages")}:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  width={100}
                  height={100}
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full rounded-lg border"
                />
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {image.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploadComponent
