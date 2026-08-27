import { formatPhoneNumber } from "@/lib/formatPhoneNumber"
import { Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"
import { PCVC_BRAND } from "@/lib/brand"

const ContactInfo = () => {
  const t = useTranslations("Footer")
  const formattedPhone = formatPhoneNumber(PCVC_BRAND.telephone)
  return (
    <div>
      <h3 className="text-golden font-semibold mb-6">{t("getInTouch")}</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <MapPin size={16} className="text-turquoise" />
          <span className="text-ivory/80 text-sm">
            Punta Cana, {t("dominicanRepublic")}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone size={16} className="text-turquoise" />
          <a
            href={`tel:${PCVC_BRAND.telephone}`}
            className="text-ivory/80 text-sm"
          >
            {formattedPhone}
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Mail size={16} className="text-turquoise" />
          <a
            href={`mailto:${PCVC_BRAND.email}`}
            className="text-ivory/80 text-sm"
          >
            {PCVC_BRAND.email}
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
