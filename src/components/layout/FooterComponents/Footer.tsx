import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import React from "react"

const Footer = () => {
  return (
    <footer className="border-b bg-gray-800 shadow-sm w-screen">
      <div className="flex justify-center">
        <LanguageSwitcher color="white" />
      </div>
      <div className="container mx-auto px-4 py-6">
        <p className="text-white text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
