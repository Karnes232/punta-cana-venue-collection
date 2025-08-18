import { client } from "@/sanity/lib/client"

interface LegalDocuments {
  pageName: string
  body: any
}

export const legalDocumentsQuery = `*[_type == "legalDocuments" && pageName == $pageName][0] {
    pageName,
    body
}`

export async function getLegalDocuments(
  pageName: string,
): Promise<LegalDocuments> {
  const legalDocuments = await client.fetch(legalDocumentsQuery, { pageName })
  return legalDocuments
}
