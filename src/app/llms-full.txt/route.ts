import { PCVC_BRAND } from "@/lib/brand"

const body = `# ${PCVC_BRAND.name}: official company context

${PCVC_BRAND.name} is a Dominican Republic event-operations partner for international agencies, planners and corporate teams. It provides local representation and coordinates venue sourcing, suppliers, production, transportation logistics and on-site execution across Punta Cana and the Dominican Republic. White-label delivery can use the partner agency's brand and uniforms. Service is available in English and Spanish.

Venue pages help clients identify a suitable location and request support for the full event. Venue inspections are complimentary for qualified clients planning an event in Punta Cana or elsewhere in the Dominican Republic.

The official website is https://puntacanvenuecollection.com. English is served at the root and Spanish under /es. The official venue directory is https://puntacanvenuecollection.com/venues and the corporate and agency service page is https://puntacanvenuecollection.com/corporate-venues.

For an event request, use https://puntacanvenuecollection.com/contact, email ${PCVC_BRAND.email}, or call/WhatsApp ${PCVC_BRAND.phoneDisplay}.
`

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
