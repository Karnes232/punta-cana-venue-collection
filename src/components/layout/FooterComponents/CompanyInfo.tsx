import React from "react"

const CompanyInfo = () => {
  return (
    <div className="lg:col-span-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-golden to-turquoise rounded-full flex items-center justify-center">
          <div className="text-2xl">🌴</div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-ivory">Punta Cana</h1>
          <p className="text-sm text-ivory/70">Venue Collection</p>
        </div>
      </div>
      <p className="text-ivory/80 mb-6 max-w-md">
        Discover the most exclusive venues in Punta Cana for your dream events.
        From beachfront ceremonies to luxury celebrations, we curate the perfect
        spaces for your special moments.
      </p>
      <div className="flex space-x-4">
        <div className="w-10 h-10 bg-ivory/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors cursor-pointer">
          <span className="text-sm">f</span>
        </div>
        <div className="w-10 h-10 bg-ivory/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors cursor-pointer">
          <span className="text-sm">ig</span>
        </div>
        <div className="w-10 h-10 bg-ivory/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors cursor-pointer">
          <span className="text-sm">tw</span>
        </div>
      </div>
    </div>
  )
}

export default CompanyInfo
