import Image from "next/image"
import React from "react"

const Logo = ({ logo }: { logo: string }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-16 h-16  rounded-full flex items-center justify-center">
        <Image src={logo} alt="Logo" width={64} height={64} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-charcoal">Punta Cana</h3>
        <p className="text-sm text-charcoal/70">Venue Collection</p>
      </div>
    </div>
  )
}

export default Logo
