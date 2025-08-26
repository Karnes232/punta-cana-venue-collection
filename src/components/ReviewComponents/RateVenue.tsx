import { Description } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React from 'react'

const RateVenue = ({ formData, setFormData}: {formData: any, setFormData: any}) => {
    const t = useTranslations("individualVenueListing")
  return (
    <>
      <Description className="text-center">
        {t("howWasYourExperience")}
      </Description>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* <IndividualStarRating
            title="Quality of service"
            formTitle="qualityOfService"
            formData={formData}
            setFormData={setFormData}
          /> */}
          {/* <IndividualStarRating
            title="Responsiveness"
            formTitle="responsiveness"
            formData={formData}
            setFormData={setFormData}
          /> */}
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* <IndividualStarRating
            title="Professionalism"
            formTitle="professionalism"
            formData={formData}
            setFormData={setFormData}
          /> */}
          {/* <IndividualStarRating
            title="Value"
            formTitle="value"
            formData={formData}
            setFormData={setFormData}
          /> */}
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* <IndividualStarRating
            title="Flexibility"
            formTitle="flexibility"
            formData={formData}
            setFormData={setFormData}
          /> */}
        </div>
      </div>
    </>
  )
}

export default RateVenue
