import { FileText, MapPin, Camera } from "lucide-react"
import React from "react"
import BlockContent from "../BlockContent/BlockContent"

const AboutCard = ({
  title,
  description,
  icon,
  locale,
}: {
  title: string
  description: { _type: string; en: any[]; es: any[] }
  icon: string
  locale: "en" | "es"
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center">
          {icon === "map-pin" && (
            <MapPin className="w-16 lg:w-20 h-16 lg:h-20" strokeWidth={1} />
          )}
          {icon === "camera" && (
            <Camera className="w-20 lg:w-24 h-20 lg:h-24" strokeWidth={1} />
          )}
          {icon === "file-text" && (
            <FileText className="w-16 lg:w-20 h-16 lg:h-20" strokeWidth={1} />
          )}
        </div>
      </div>
      <h3 className="font-hero-display text-2xl lg:text-3xl font-bold">
        {title}
      </h3>
      <div className="flex justify-center items-center text-center gap-2 mx-2">
        <BlockContent content={description} language={locale as "en" | "es"} />
      </div>
    </div>
  )
}

export default AboutCard
