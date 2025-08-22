import { FileText, MapPin, Camera } from 'lucide-react'
import React from 'react'
import BlockContent from '../BlockContent/BlockContent'
import { Cormorant_Garamond } from 'next/font/google'

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const AboutCard = ({title, description, icon, locale}: {title: string, description: { _type: string, en: any[], es: any[] }, icon: string, locale: "en" | "es"}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 max-w-xs mx-auto'>
       <div className='flex items-center gap-4'>
        <div className='w-20 h-20 rounded-full flex items-center justify-center'>
            {icon === 'map-pin' && <MapPin className='w-16 h-16' strokeWidth={1} />}
            {icon === 'camera' && <Camera className='w-16 h-16' strokeWidth={1} />}
            {icon === 'file-text' && <FileText className='w-16 h-16' strokeWidth={1} />}
        </div>
        
       </div>
       <h3 className={`${coromantGaramond.className} text-2xl font-bold`}>{title}</h3>
       <div className='flex justify-center items-center text-center gap-2'>
       <BlockContent content={description} language={locale as "en" | "es"} />
       </div>
    </div>
  )
}

export default AboutCard