import Image from 'next/image'
import React from 'react'

const Logo = ({ logo }: { logo: string }) => {
  return (
    <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-golden to-turquoise rounded-full flex items-center justify-center">
              <Image src={logo} alt="Logo" width={48} height={48} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-charcoal">Punta Cana</h1>
              <p className="text-sm text-charcoal/70">Venue Collection</p>
            </div>
          </div>
  )
}

export default Logo