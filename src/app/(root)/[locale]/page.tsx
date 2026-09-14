import Home from "@/components/Enterprise/Home"
import { Locale, metadata } from "@/lib/enterprise"
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return <Home locale={locale}/>}
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return metadata(locale,"",locale==="es"?"Gestión y producción de eventos corporativos en República Dominicana":"Corporate Event Management & Production in the Dominican Republic",locale==="es"?"Un brief. Un equipo. Planificación, diseño, venues, producción, transporte y operación integral de tu evento corporativo.":"One brief. One team. Corporate event planning, design, venues, production, transportation and complete on-site operations.")}
