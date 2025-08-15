"use client"

import React, { useState } from 'react'
import TopBar from './TopBar';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import ActionButtons from './ActionButtons';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';

const Navbar = ({ logo }: { logo: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <nav className="bg-ivory shadow-lg sticky top-0 z-50">
        <TopBar />
        <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
            <Logo logo={logo} />
            <DesktopNav />
            <ActionButtons isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <SearchBar isSearchOpen={isSearchOpen} />
            <MobileMenu isMenuOpen={isMenuOpen} />
        </div>
        </div>
    </nav>
  )
}

export default Navbar