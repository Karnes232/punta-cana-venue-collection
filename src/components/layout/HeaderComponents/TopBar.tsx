import { Mail, Phone } from "lucide-react"
import React from "react"

const TopBar = () => {
  return (
    <div className="bg-charcoal text-ivory py-2 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Phone size={14} />
            <span>+1 (809) 555-0123</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail size={14} />
            <span>info@puntacanavenues.com</span>
          </div>
        </div>
        {/* <div className="hidden md:flex items-center space-x-4">
          <span>🇺🇸 EN</span>
          <span>🇪🇸 ES</span>
        </div> */}
      </div>
    </div>
  )
}

export default TopBar
