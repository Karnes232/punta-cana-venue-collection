import React from "react"

const ServiceDescription = ({
  servicesTitle,
  servicesDescription,
  servicesItems,
  locale,
}: {
  servicesTitle: string
  servicesDescription: string
  servicesItems: any
  locale: string
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-charcoal mb-4 sm:mb-6">
          {servicesTitle}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          {servicesDescription}
        </p>
        <div className="space-y-3 sm:space-y-4">
          {servicesItems.map((item: any, index: number) => (
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-golden rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-charcoal mb-1 sm:mb-2 text-sm sm:text-base">
                  {item.title[locale]}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceDescription
