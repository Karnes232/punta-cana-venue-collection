import { Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const FlatRateComponent = ({
  flatRateText,
  flatRate,
  flatRateButtonText,
}: {
  flatRateText: string
  flatRate: number
  flatRateButtonText: string
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-auto">
      <h2
        className={`${coromantGaramond.className} text-3xl lg:text-4xl text-center`}
      >
        {flatRateText}
      </h2>
      <p
        className={`${coromantGaramond.className} text-6xl text-center md:mb-5`}
      >
        ${flatRate}
      </p>
      <Link
        href="/venues"
        className={`${coromantGaramond.className} text-2xl text-center px-8 py-4  border-2 border-black hover:bg-black hover:text-white  transition-all duration-1000 shadow-md hover:shadow-lg`}
      >
        {flatRateButtonText}
      </Link>
    </div>
  )
}

export default FlatRateComponent
