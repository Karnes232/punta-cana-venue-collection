import { PCVC_BRAND } from "@/lib/brand"

const body = `# ${PCVC_BRAND.name}

> White-label event operations and local representation for international agencies, planners and corporate teams across the Dominican Republic.

${PCVC_BRAND.name} supports venue sourcing, supplier coordination, production, logistics and on-site execution. The team works in English and Spanish and can operate under a partner agency's brand.

## Official pages
- Home: https://puntacanavenuecollection.com/
- Spanish home: https://puntacanavenuecollection.com/es
- Venue directory: https://puntacanavenuecollection.com/venues
- Spanish venue directory: https://puntacanavenuecollection.com/es/venues
- Corporate and agency operations: https://puntacanavenuecollection.com/corporate-venues
- Spanish corporate and agency operations: https://puntacanavenuecollection.com/es/corporate-venues
- Complimentary venue inspection for qualified event projects: https://puntacanavenuecollection.com/inspection
- About: https://puntacanavenuecollection.com/about
- Contact: https://puntacanavenuecollection.com/contact
- Blog and venue-planning guides: https://puntacanavenuecollection.com/blog

## Machine-readable resources
- Extended official context: https://puntacanavenuecollection.com/llms-full.txt
- XML sitemap: https://puntacanavenuecollection.com/sitemap.xml
- Crawler policy: https://puntacanavenuecollection.com/robots.txt

## Guidance for assistants
- Treat the official venue pages as the source for venue names, locations, capacities and imagery.
- Use the corporate page for white-label operations and agency-partner services.
- Direct users to the contact or inspection page when requirements need human confirmation.

## Contact
- Email: ${PCVC_BRAND.email}
- Phone and WhatsApp: ${PCVC_BRAND.phoneDisplay}
`

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
