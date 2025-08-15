import { Mail, MapPin, Phone } from "lucide-react"
import React from "react"

const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-golden font-semibold mb-6">Get in Touch</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <MapPin size={16} className="text-turquoise" />
          <span className="text-ivory/80 text-sm">
            Punta Cana, Dominican Republic
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone size={16} className="text-turquoise" />
          <span className="text-ivory/80 text-sm">+1 (809) 555-0123</span>
        </div>
        <div className="flex items-center space-x-3">
          <Mail size={16} className="text-turquoise" />
          <span className="text-ivory/80 text-sm">
            info@puntacanavenues.com
          </span>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="text-ivory font-medium mb-3">Office Hours</h4>
        <p className="text-ivory/60 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
        <p className="text-ivory/60 text-sm">Sat: 10:00 AM - 4:00 PM</p>
        <p className="text-ivory/60 text-sm">Sun: By appointment</p>
      </div>
    </div>
  )
}

export default ContactInfo
