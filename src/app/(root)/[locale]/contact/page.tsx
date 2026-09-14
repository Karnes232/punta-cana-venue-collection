import EnterprisePage,{pageCopy} from "@/components/Enterprise/Pages"
import { Locale,metadata } from "@/lib/enterprise"
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return <EnterprisePage locale={locale} path="contact"/>}
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;const c=pageCopy("contact",locale);return metadata(locale,"/contact",c.title,c.description)}
