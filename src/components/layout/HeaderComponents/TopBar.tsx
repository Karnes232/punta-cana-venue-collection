import { Mail, Phone } from "lucide-react"
import React from "react"

const TopBar = ({ email, telephone }: { email: string; telephone: string }) => {
  return (
    <div className="bg-charcoal text-ivory py-2 px-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm xl:text-base">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex items-center space-x-1">
            <Phone size={14} />
            <a href={`tel:${telephone}`}>{telephone}</a>
          </div>
          <div className="flex items-center space-x-1">
            <Mail size={14} />
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
