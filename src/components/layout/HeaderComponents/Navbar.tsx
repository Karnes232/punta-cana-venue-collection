"use client"

import React, { useState } from "react"
import TopBar from "./TopBar"
import Logo from "./Logo"
import DesktopNav from "./DesktopNav"
import ActionButtons from "./ActionButtons"
import SearchBar from "./SearchBar"
import MobileMenu from "./MobileMenu"
import { PCVC_BRAND } from "@/lib/brand"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <>
      <nav
        className={`bg-ivory shadow-lg z-50 ${isMenuOpen ? "fixed top-0 left-0 right-0" : "md:fixed md:top-0 md:left-0 md:right-0"}`}
      >
        <TopBar email={PCVC_BRAND.email} telephone={PCVC_BRAND.telephone} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Logo />
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
      <div className="md:h-[7.5rem]"></div>
    </>
  )
}

export default Navbar
