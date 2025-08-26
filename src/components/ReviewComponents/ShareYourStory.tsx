import { Description, Input, Textarea } from "@headlessui/react"
import { useTranslations } from "next-intl"
import React from "react"

const ShareYourStory = ({
  formData,
  setFormData,
}: {
  formData: any
  setFormData: any
}) => {
  const t = useTranslations("RateVenue")
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="lg:max-w-3xl lg:mx-auto space-y-4">
      <Description className="font-bold text-center text-xl">
        {t("shareYourStory")}
      </Description>
      <Input
        name="title"
        type="text"
        className="w-full border px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-1 focus:ring-golden"
        placeholder={t("createTitle")}
        onChange={handleChange}
      />
      <Textarea
        name="description"
        className="w-full h-60 border px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-1 focus:ring-golden"
        placeholder={t("shareYourStoryPlaceholder")}
        onChange={handleChange}
      ></Textarea>
    </div>
  )
}

export default ShareYourStory
