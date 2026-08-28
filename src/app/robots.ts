import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const searchableCrawlers = [
    "*",
    "Googlebot",
    "Bingbot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "meta-externalagent",
    "facebookexternalhit",
  ]

  return {
    rules: searchableCrawlers.map(userAgent => ({ userAgent, allow: "/" })),
    sitemap: "https://puntacanvenuecollection.com/sitemap.xml",
    host: "https://puntacanvenuecollection.com",
  }
}
