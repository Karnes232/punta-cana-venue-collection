import { Description } from "@headlessui/react"
import { useTranslations } from "next-intl"
import React from "react"
import IndividualStarRating from "./IndividualStarRating"

const RateVenue = ({
  formData,
  setFormData,
}: {
  formData: any
  setFormData: any
}) => {
  const t = useTranslations("RateVenue")
  return (
    <>
      <Description className="text-center">
        {t("howWasYourExperience")}
      </Description>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <IndividualStarRating
            title={t("qualityOfService")}
            formTitle="qualityOfService"
            formData={formData}
            setFormData={setFormData}
          />
          <IndividualStarRating
            title={t("responsiveness")}
            formTitle="responsiveness"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <IndividualStarRating
            title={t("professionalism")}
            formTitle="professionalism"
            formData={formData}
            setFormData={setFormData}
          />
          <IndividualStarRating
            title={t("value")}
            formTitle="value"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <IndividualStarRating
            title={t("flexibility")}
            formTitle="flexibility"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  )
}

export default RateVenue
