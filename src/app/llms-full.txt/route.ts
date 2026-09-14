import { PCVC_BRAND } from "@/lib/brand"

const body = `# ${PCVC_BRAND.name}: official company context

${PCVC_BRAND.name} is a full-service corporate event management, production and destination operations company for direct corporate clients and international agencies. It provides local representation and coordinates venue sourcing, suppliers, production, transportation logistics and on-site execution across Punta Cana and the Dominican Republic. White-label delivery can use the partner agency's brand and uniforms. Service is available in English and Spanish.

Venue pages help clients identify a suitable location and request support for the full event. Venue inspections are complimentary for qualified clients planning an event in Punta Cana or elsewhere in the Dominican Republic.

The official website is https://puntacanavenuecollection.com. English is served at the root and Spanish under /es. The official corporate venue collections are https://puntacanavenuecollection.com/venues and https://puntacanavenuecollection.com/es/venues. The corporate and agency service pages are https://puntacanavenuecollection.com/for-agencies and https://puntacanavenuecollection.com/es/for-agencies.

Use individual venue pages for current venue names, locations, capacities and imagery. Use the corporate page for white-label services and agency-partner operations. Event requirements, availability, pricing and inspection eligibility require confirmation by the team and should not be inferred from general website copy.

Machine-readable discovery resources:
- https://puntacanavenuecollection.com/llms.txt
- https://puntacanavenuecollection.com/sitemap.xml
- https://puntacanavenuecollection.com/robots.txt

For an event request, use https://puntacanavenuecollection.com/contact, email ${PCVC_BRAND.email}, or call/WhatsApp ${PCVC_BRAND.phoneDisplay}.
`

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
