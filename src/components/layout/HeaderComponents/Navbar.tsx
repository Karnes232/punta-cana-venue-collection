"use client"

import React, { useState } from "react"
import TopBar from "./TopBar"
import Logo from "./Logo"
import DesktopNav from "./DesktopNav"
import ActionButtons from "./ActionButtons"
import SearchBar from "./SearchBar"
import MobileMenu from "./MobileMenu"

const Navbar = ({
  logo,
  email,
  telephone,
}: {
  logo: string
  email: string
  telephone: string
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <>
      <nav
        className={`bg-ivory shadow-lg z-50 ${isMenuOpen ? "fixed top-0 left-0 right-0" : "md:fixed md:top-0 md:left-0 md:right-0"}`}
      >
        <TopBar email={email} telephone={telephone} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Logo logo={logo} />
            <DesktopNav />
            <ActionButtons
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
            {/* <SearchBar isSearchOpen={isSearchOpen} /> */}
            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </nav>
      <div className="md:h-28"></div>
    </>
  )
}

export default Navbar
