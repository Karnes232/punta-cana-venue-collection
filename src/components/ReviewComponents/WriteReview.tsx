import React, { useState } from "react"
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { X } from "lucide-react"
import Recommend from "./Recommend"
import RateVenue from "./RateVenue"
import { useTranslations } from "next-intl"

const WriteReview = ({
  page,
  pageName,
}: {
  page: string
  pageName: string
}) => {
  const t = useTranslations("RateVenue")
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    page: page,
    recommend: "",
    qualityOfService: 0,
    responsiveness: 0,
    professionalism: 0,
    value: 0,
    flexibility: 0,
    title: "",
    description: "",
    Images: [],
  })

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg px-6 py-2 bg-gradient-to-br from-golden/50 to-golden/90 text-charcoal hover:bg-golden/90 transition-colors font-medium"
      >
        {t("writeReview")}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen h-screen justify-center overflow-scroll bg-white">
          <DialogPanel className="w-screen h-fit space-y-4 p-12 pb-16">
            <div className="fixed top-5 right-5">
              <button
                className="p-2 text-2xl text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>
            </div>
            <DialogTitle className="font-bold text-center text-xl">
              {pageName}
            </DialogTitle>
            <Recommend formData={formData} setFormData={setFormData} />
            <RateVenue formData={formData} setFormData={setFormData} />
            {/* <ShareYourStory formData={formData} setFormData={setFormData} /> */}
            {/* <ImageUploadComponent
              formData={formData}
              setFormData={setFormData}
            /> */}
            {/* <SubmitReview formData={formData} /> */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default WriteReview
