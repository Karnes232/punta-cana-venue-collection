import React from 'react'
import StarRating from './StarRating'

const ReviewComponent = ({page, pageName}: {page: string, pageName: string}) => {
    console.log(page)

    let overAllRating = 4.5
    let qualityOfServiceAvg = 4.5
    let responsivenessAvg = 4.5
    let professionalismAvg = 4.5
    let valueAvg = 4.5
    let flexibilityAvg = 4.5
    
  return (
    <>
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 my-5 md:justify-between lg:max-w-2xl">
    <StarRating page={page} overAllRating={overAllRating} pageName={pageName} />
        {/* <ProgressBars
          qualityOfServiceAvg={qualityOfServiceAvg}
          responsivenessAvg={responsivenessAvg}
          professionalismAvg={professionalismAvg}
          valueAvg={valueAvg}
          flexibilityAvg={flexibilityAvg}
        /> */}

    </div>
    
    
    </>
  )
}

export default ReviewComponent