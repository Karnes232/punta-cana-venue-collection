export const socialTerms =
  /\b(weddings?|bridal|bride|groom|marriage|romantic|birthdays?|anniversar(?:y|ies)|elopement|honeymoon|boda[s]?|novia|novio|nupcial|cumpleaños|aniversario[s]?|romántic[oa]s?)\b|social (?:events?|programs?|celebrations?)|eventos sociales|programas sociales|vow renewal|get married|big day/i
export const isCorporateLabel = (value: string) => !socialTerms.test(value)
export function isCommercialArticle(post: {
  slug?: { current?: string }
  title?: { en?: string; es?: string }
  description?: { en?: string; es?: string }
}) {
  return !socialTerms.test(
    [
      post.slug?.current?.replaceAll("-", " "),
      post.title?.en,
      post.title?.es,
      post.description?.en,
      post.description?.es,
    ]
      .filter(Boolean)
      .join(" "),
  )
}
