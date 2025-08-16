import { client } from "@/sanity/lib/client"

interface Logo {
  logo: {
    asset: {
      url: string
    }
  }
}

export const logoQuery = `*[_type == "generalLayout"][0] {
    logo {
        asset -> {
            url
        }
    }
}`

export async function getLogo(): Promise<Logo> {
  const logo = await client.fetch<Logo>(logoQuery)
  return logo
}

export const companyInfoQuery = `*[_type == "generalLayout"][0] {
    companyName,
    email,
    telephone,
    socialLinks,
    companyDescription {
        en,
        es
    }
}`

export interface CompanyInfo {
  companyName: string
  email: string
  telephone: string
  socialLinks: {
    facebook: string
    instagram: string
  }
  companyDescription: {
    en: string
    es: string
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  const companyInfo = await client.fetch<CompanyInfo>(companyInfoQuery)
  return companyInfo
}
