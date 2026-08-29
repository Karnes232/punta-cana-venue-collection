import { readFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const read = path => readFileSync(join(root, path), "utf8")
const failures = []
const expect = (condition, message) => {
  if (!condition) failures.push(message)
}

const robots = read("src/app/robots.ts")
for (const crawler of [
  '"*"',
  '"OAI-SearchBot"',
  '"ChatGPT-User"',
  '"GPTBot"',
  '"ClaudeBot"',
  '"Claude-SearchBot"',
  '"PerplexityBot"',
  '"Google-Extended"',
]) {
  expect(robots.includes(crawler), `robots.ts is missing ${crawler}`)
}
expect(robots.includes("sitemap.xml"), "robots.ts must advertise the sitemap")

const llms = read("src/app/llms.txt/route.ts")
expect(llms.includes("/llms-full.txt"), "llms.txt must link to llms-full.txt")
expect(llms.includes("/sitemap.xml"), "llms.txt must link to the sitemap")
expect(llms.includes("/about"), "llms.txt must link to the current about page")
expect(
  !llms.includes("/about-us"),
  "llms.txt still references the obsolete /about-us URL",
)

const formFiles = [
  "src/components/CorporateComponents/CorporateProposalForm.tsx",
  "src/components/ContactForms/ContactPageForm.tsx",
  "src/components/VenueInspectionComponents/InspectionForm.tsx",
  "src/components/ContactForms/IndividualVenueContactForm.tsx",
  "src/components/ContactForms/BlogPostContactForm.tsx",
  "src/components/ContactForms/AddVenueForm.tsx",
  "src/components/HeroComponent/HeroComponentVenuePage.tsx",
]

for (const path of formFiles) {
  const source = read(path)
  expect(source.includes("<form"), `${path} does not contain a form`)
  expect(source.includes("toolname="), `${path} is missing a WebMCP tool name`)
  expect(
    source.includes("tooldescription="),
    `${path} is missing a WebMCP tool description`,
  )
  expect(
    !source.includes("toolautosubmit="),
    `${path} must not auto-submit a commercial or lead form`,
  )
}

const homeClient = read("src/components/MainPageComponents/HomePageClient.tsx")
expect(
  !homeClient.includes('"use client"'),
  "The static homepage sections must remain server-rendered",
)

const homeHero = read("src/components/HeroComponent/HeroComponent.tsx")
expect(
  homeHero.includes('id="home-venue-search"'),
  "Home search needs an accessible label target",
)
expect(
  homeHero.includes("quality={75}"),
  "Home hero image should use the optimized quality",
)

const nextConfig = read("next.config.ts")
expect(
  nextConfig.includes('"image/avif"'),
  "Next image AVIF delivery is not enabled",
)
expect(
  nextConfig.includes("minimumCacheTTL"),
  "Next image cache TTL is not configured",
)
expect(
  !nextConfig.includes("webpack:"),
  "Custom webpack chunking should not override Next defaults",
)

if (failures.length) {
  console.error("Agentic and performance contract failed:\n")
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(
  `Agentic and performance contract passed (${formFiles.length} forms covered).`,
)
