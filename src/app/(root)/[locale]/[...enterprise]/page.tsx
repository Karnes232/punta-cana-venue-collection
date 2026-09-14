import { notFound } from "next/navigation"
import EnterprisePage,{enterprisePaths,pageCopy} from "@/components/Enterprise/Pages"
import { Locale,metadata } from "@/lib/enterprise"
type Props={params:Promise<{locale:Locale;enterprise:string[]}>}
export function generateStaticParams(){return enterprisePaths.map(path=>({enterprise:path.split("/")}))}
export async function generateMetadata({params}:Props){const {locale,enterprise}=await params;const path=enterprise.join("/");if(!enterprisePaths.includes(path))return {};const c=pageCopy(path,locale);return {...metadata(locale,"/"+path,c.title,c.description),...(path==="rfp-received"||path==="our-work"?{robots:{index:false,follow:true}}:{})}}
export default async function Page({params}:Props){const {locale,enterprise}=await params,path=enterprise.join("/");if(!enterprisePaths.includes(path))notFound();return <EnterprisePage locale={locale} path={path}/>}
