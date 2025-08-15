import React from "react"
import CompanyInfo from "./CompanyInfo"
import QuickLinks from "./QuickLinks"
import ContactInfo from "./ContactInfo"
import BottomBar from "./BottomBar"

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <CompanyInfo />
          <QuickLinks />
          <ContactInfo />
        </div>
        <BottomBar />
      </div>
    </footer>
  )
}

export default Footer
