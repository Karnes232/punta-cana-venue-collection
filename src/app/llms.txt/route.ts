import { PCVC_BRAND } from "@/lib/brand"

const body = `# ${PCVC_BRAND.name}

> White-label event operations and local representation for international agencies, planners and corporate teams across the Dominican Republic.

${PCVC_BRAND.name} supports venue sourcing, supplier coordination, production, logistics and on-site execution. The team works in English and Spanish and can operate under a partner agency's brand.

## Official pages
- Home: https://puntacanavenuecollection.com/
- Spanish home: https://puntacanavenuecollection.com/es
- Venues: https://puntacanavenuecollection.com/venues
- Corporate and agency operations: https://puntacanavenuecollection.com/corporate-venues
- Complimentary venue inspection for qualified event projects: https://puntacanavenuecollection.com/inspection
- About: https://puntacanavenuecollection.com/about-us
- Contact: https://puntacanavenuecollection.com/contact
- Blog: https://puntacanavenuecollection.com/blog

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
