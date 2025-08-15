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
