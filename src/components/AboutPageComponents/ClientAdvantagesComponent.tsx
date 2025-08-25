import { Cormorant_Garamond } from "next/font/google"
import React from "react"
import { useTranslations } from "next-intl"
const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const ClientAdvantagesComponent = ({
  clientAdvantages,
}: {
  clientAdvantages: string[]
}) => {
  const t = useTranslations("AboutPage")
  return (
    <div className="flex flex-col justify-start items-center gap-4 max-w-xs lg:max-w-sm mx-auto">
      <h3
        className={`${coromantGaramond.className} text-3xl lg:text-4xl text-center`}
      >
        {t("clientAdvantages")}
      </h3>
      <ul className="list-disc list-inside flex flex-col gap-2">
        {clientAdvantages.map((advantage, index) => (
          <li
            key={index}
            className={`${coromantGaramond.className} text-lg lg:text-xl`}
          >
            {advantage}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClientAdvantagesComponent
