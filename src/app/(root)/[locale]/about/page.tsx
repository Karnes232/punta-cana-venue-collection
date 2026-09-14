import EnterprisePage,{pageCopy} from "@/components/Enterprise/Pages"
import { Locale,metadata } from "@/lib/enterprise"
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return <EnterprisePage locale={locale} path="about"/>}
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;const c=pageCopy("about",locale);return metadata(locale,"/about",c.title,c.description)}
