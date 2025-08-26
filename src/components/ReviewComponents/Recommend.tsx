import { Description } from '@headlessui/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

const Recommend = ({ formData, setFormData}: {formData: any, setFormData: any}) => {
    const t = useTranslations("individualVenueListing")
    const handleRecommend = () => {
        setFormData({
          ...formData,
          recommend: true,
        });
      };
      const handleDontRecommend = () => {
        setFormData({
          ...formData,
          recommend: false,
        });
      };
  return (
    <>
      <Description className="text-center">
        {t("recommend")}
      </Description>
      <div className="flex justify-center items-center gap-5">
        <div
          className={`text-3xl border border-gray-500 p-2 rounded-lg hover:bg-golden/80 transition-all ${
            formData.recommend ? "bg-golden/80" : ""
          }`}
          onClick={handleRecommend}
        >
          <ThumbsUp />
        </div>
        <div
          className={`text-3xl border border-gray-500 p-2 rounded-lg hover:bg-golden/80 transition-all ${
            formData.recommend === false ? "bg-golden/80" : ""
          }`}
          onClick={handleDontRecommend}
        >
          <ThumbsDown />
        </div>
      </div>
    </>
  )
}

export default Recommend