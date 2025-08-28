import React from "react"
import { Playfair_Display, Raleway } from "next/font/google"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const TextComponentParagraphIndividualVenuePage = ({
  paragraph,
  ParagraphClassName,
}: {
  paragraph: string
  ParagraphClassName: string
}) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center max-w-7xl xl:mx-auto">
        <p
          className={`${raleway.className} lg:text-lg text-gray-700 dark:text-white ${ParagraphClassName}`}
        >
          {paragraph}
        </p>
      </div>
    </div>
  )
}

export default TextComponentParagraphIndividualVenuePage
