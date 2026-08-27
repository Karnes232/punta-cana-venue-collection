import { redirect } from "next/navigation"

export default async function AddVenue({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  redirect(locale === "es" ? "/es/corporate-venues" : "/corporate-venues")
}
