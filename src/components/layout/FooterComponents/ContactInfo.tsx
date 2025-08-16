import { Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"

const ContactInfo = ({ companyInfo }: { companyInfo: any }) => {
  const t = useTranslations("Footer")
  return (
    <div>
      <h3 className="text-golden font-semibold mb-6">Get in Touch</h3>
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
            href={`tel:${companyInfo.telephone}`}
            className="text-ivory/80 text-sm"
          >
            {companyInfo.telephone}
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Mail size={16} className="text-turquoise" />
          <a
            href={`mailto:${companyInfo.email}`}
            className="text-ivory/80 text-sm"
          >
            {companyInfo.email}
          </a>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="text-ivory font-medium mb-3">{t("officeHours")}</h4>
        <p className="text-ivory/60 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
        <p className="text-ivory/60 text-sm">Sat: 10:00 AM - 4:00 PM</p>
        <p className="text-ivory/60 text-sm">Sun: By appointment</p>
      </div>
    </div>
  )
}

export default ContactInfo
