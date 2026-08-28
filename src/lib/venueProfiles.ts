export type VenueLocale = "en" | "es"

export type LocalizedText = Record<VenueLocale, string>

export interface VenueFact {
  label: LocalizedText
  value: LocalizedText
}

export interface VenuePlanningProfile {
  titleOverride?: LocalizedText
  locationOverride?: string
  summary?: LocalizedText
  bestFor?: LocalizedText[]
  facts?: VenueFact[]
  considerations?: LocalizedText[]
  verifiedMaximumCapacity?: number
  sourceUrl?: string
  sourceLabel?: string
  forceFallbackSeo?: boolean
}

const text = (en: string, es: string): LocalizedText => ({ en, es })
const fact = (labelEn: string, labelEs: string, value: string): VenueFact => ({
  label: text(labelEn, labelEs),
  value: text(value, value),
})

const sharedMajesticProfile: VenuePlanningProfile = {
  summary: text(
    "This resort uses the shared Majestic convention center, a practical option for programs that combine meetings, accommodation and resort activities.",
    "Este resort utiliza el centro de convenciones compartido de Majestic, una opción práctica para programas que combinan reuniones, alojamiento y actividades de resort.",
  ),
  bestFor: [
    text("Corporate meetings", "Reuniones corporativas"),
    text("Incentive groups", "Grupos de incentivos"),
    text("Medium-size conferences", "Conferencias medianas"),
    text("Multi-day social programs", "Programas sociales de varios días"),
  ],
  facts: [
    fact("Published meeting area", "Área de reuniones publicada", "1,000 m²"),
    fact("Flexible rooms", "Salones flexibles", "6"),
    fact("Published maximum", "Máximo publicado", "Up to 600 / Hasta 600"),
  ],
  considerations: [
    text(
      "The convention center is shared across Majestic Colonial, Elegance and Mirage; room allocation must be confirmed for the selected dates.",
      "El centro de convenciones es compartido por Majestic Colonial, Elegance y Mirage; la asignación de salones debe confirmarse para las fechas elegidas.",
    ),
  ],
  verifiedMaximumCapacity: 600,
  sourceUrl: "https://www.majestic-resorts.com/punta-cana/groups-events",
  sourceLabel: "Majestic Resorts",
}

const sharedHyattProfile: VenuePlanningProfile = {
  summary: text(
    "A large shared event campus for Hyatt Ziva and Hyatt Zilara Cap Cana, suitable for multi-room conferences, incentives and large social programs.",
    "Un amplio complejo de eventos compartido por Hyatt Ziva y Hyatt Zilara Cap Cana, adecuado para conferencias con varios salones, incentivos y grandes programas sociales.",
  ),
  bestFor: [
    text("Multi-day conferences", "Conferencias de varios días"),
    text("Incentive programs", "Programas de incentivos"),
    text("Large product launches", "Grandes lanzamientos de producto"),
    text("Large group programs", "Grandes programas grupales"),
  ],
  facts: [
    fact("Shared event campus", "Complejo compartido", "100,000+ ft²"),
    fact("Event spaces", "Espacios para eventos", "36"),
    fact("Breakout rooms", "Salones de apoyo", "16"),
    fact("Largest ballroom", "Salón principal", "Up to 2,070 / Hasta 2,070"),
  ],
  considerations: [
    text(
      "Capacities belong to the shared Ziva–Zilara complex and should not be counted twice when comparing the two hotels.",
      "Las capacidades pertenecen al complejo compartido Ziva–Zilara y no deben contarse dos veces al comparar ambos hoteles.",
    ),
  ],
  verifiedMaximumCapacity: 2070,
  sourceUrl:
    "https://www.hyatt.com/zilara/en-US/pujia-hyatt-zilara-cap-cana/meetings",
  sourceLabel: "Hyatt",
}

const sharedRoyaltonProfile: VenuePlanningProfile = {
  summary: text(
    "Royalton Punta Cana and Hideaway share the same meeting infrastructure, allowing resort stays, meetings and group activities to be coordinated within one complex.",
    "Royalton Punta Cana y Hideaway comparten la misma infraestructura de reuniones, lo que permite coordinar alojamiento, reuniones y actividades grupales dentro de un mismo complejo.",
  ),
  bestFor: [
    text("Corporate meetings", "Reuniones corporativas"),
    text("Incentive groups", "Grupos de incentivos"),
    text("Conferences", "Conferencias"),
    text("Multi-day group programs", "Programas grupales de varios días"),
  ],
  facts: [
    fact("Shared meeting area", "Área compartida", "13,000+ ft²"),
    fact("Published theater capacity", "Capacidad teatro publicada", "620"),
    fact("Main ballroom", "Salón principal", "3,198 ft²"),
  ],
  considerations: [
    text(
      "The meeting facilities are shared by Royalton Punta Cana and Hideaway; the room block and event space must be contracted together carefully.",
      "Las facilidades de reuniones son compartidas por Royalton Punta Cana y Hideaway; el bloque de habitaciones y los espacios deben contratarse de forma coordinada.",
    ),
  ],
  verifiedMaximumCapacity: 620,
  sourceUrl:
    "https://www.royaltonresorts.com/resorts/hideaway-punta-cana/special-occasions/groups",
  sourceLabel: "Royalton Resorts",
}

const sharedBahiaProfile: VenuePlanningProfile = {
  summary: text(
    "This property is part of the Bahia Principe Punta Cana resort complex and uses shared group and convention infrastructure.",
    "Esta propiedad forma parte del complejo Bahia Principe Punta Cana y utiliza infraestructura compartida para grupos y convenciones.",
  ),
  bestFor: [
    text("Incentive groups", "Grupos de incentivos"),
    text("Corporate meetings", "Reuniones corporativas"),
    text("Group celebrations", "Celebraciones grupales"),
  ],
  considerations: [
    text(
      "The exact assigned room, layout capacity and access between hotels must be confirmed in the venue proposal; shared facilities should not be counted as separate convention centers.",
      "El salón asignado, la capacidad por montaje y el acceso entre hoteles deben confirmarse en la propuesta; las áreas compartidas no deben contarse como centros de convenciones separados.",
    ),
  ],
}

export const VENUE_PLANNING_PROFILES: Record<string, VenuePlanningProfile> = {
  "barcelo-bavaro-palace": {
    summary: text(
      "One of Punta Cana's strongest options for complex programs that require large capacities, multiple simultaneous rooms and coordinated resort logistics.",
      "Una de las opciones más sólidas de Punta Cana para programas complejos que requieren gran capacidad, varios salones simultáneos y logística coordinada dentro del resort.",
    ),
    bestFor: [
      text("Large conventions", "Grandes convenciones"),
      text("Exhibitions", "Exhibiciones"),
      text("Product launches", "Lanzamientos de producto"),
      text("Large social programs", "Grandes programas sociales"),
    ],
    facts: [
      fact("Convention center", "Centro de convenciones", "123,785 ft²"),
      fact("Flexible inventory", "Inventario flexible", "13 rooms / 24 halls"),
      fact(
        "Published maximum",
        "Máximo publicado",
        "Up to 5,000 / Hasta 5,000",
      ),
    ],
    considerations: [
      text(
        "For large programs, internal transportation, loading schedules, breakout allocation and simultaneous food service should be defined before contracting production.",
        "Para programas grandes deben definirse el transporte interno, los horarios de carga, la asignación de salones y el servicio simultáneo de alimentos antes de contratar la producción.",
      ),
    ],
    verifiedMaximumCapacity: 5000,
    sourceUrl:
      "https://www.barcelo.com/en-ww/barcelo-bavaro-beach/meetings-and-events/",
    sourceLabel: "Barceló Hotel Group",
  },
  "hard-rock-hotel-and-casino-punta-cana": {
    summary: text(
      "A high-capacity resort with strong production infrastructure for concerts, conferences, brand activations and large-scale social events.",
      "Un resort de gran capacidad con sólida infraestructura de producción para conciertos, conferencias, activaciones de marca y eventos sociales de gran escala.",
    ),
    bestFor: [
      text("Conferences", "Conferencias"),
      text("Entertainment programs", "Programas de entretenimiento"),
      text("Product launches", "Lanzamientos de producto"),
      text("Large social productions", "Grandes producciones sociales"),
    ],
    facts: [
      fact("Fillmore Ballroom", "Salón Fillmore", "37,500 ft²"),
      fact(
        "Published maximum",
        "Máximo publicado",
        "Up to 3,900 / Hasta 3,900",
      ),
      fact("Avalon Ballroom", "Salón Avalon", "19,000 ft²"),
    ],
    considerations: [
      text(
        "Rigging, audiovisual production, rehearsals, security and loading windows should be approved as one integrated production plan.",
        "El rigging, la producción audiovisual, los ensayos, la seguridad y las ventanas de carga deben aprobarse como un solo plan de producción.",
      ),
    ],
    verifiedMaximumCapacity: 3900,
    sourceUrl: "https://hotel.hardrock.com/punta-cana/plan-an-event.htm",
    sourceLabel: "Hard Rock Hotel Punta Cana",
  },
  "hyatt-ziva-cap-cana": sharedHyattProfile,
  "hyatt-zilara-cap-cana": sharedHyattProfile,
  "majestic-colonial-punta-cana": sharedMajesticProfile,
  "majestic-elegance-punta-cana": sharedMajesticProfile,
  "majestic-mirage-punta-cana": sharedMajesticProfile,
  "royalton-punta-cana": sharedRoyaltonProfile,
  "hideaway-at-royalton-punta-cana": sharedRoyaltonProfile,
  "bahia-principe-ambar": sharedBahiaProfile,
  "bahia-principe-esmeralda": sharedBahiaProfile,
  "bahia-principe-fantasia": sharedBahiaProfile,
  "gran-palladium-palace": {
    titleOverride: text(
      "Grand Palladium Palace Resort Spa & Casino",
      "Grand Palladium Palace Resort Spa & Casino",
    ),
    summary: text(
      "A resort-complex option for meetings, incentives and celebrations that benefit from shared accommodation and event facilities.",
      "Una opción dentro de un complejo de resorts para reuniones, incentivos y celebraciones que aprovechan alojamiento y facilidades de eventos compartidas.",
    ),
    bestFor: [
      text("Meetings", "Reuniones"),
      text("Incentive groups", "Grupos de incentivos"),
      text("Medium conferences", "Conferencias medianas"),
      text("Multi-day group programs", "Programas grupales de varios días"),
    ],
    facts: [
      fact("Meeting rooms", "Salones de reuniones", "6"),
      fact("Published theater maximum", "Máximo teatro publicado", "500"),
    ],
    considerations: [
      text(
        "Meeting facilities are shared within the Grand Palladium complex; confirm the exact hotel, room assignment and guest access in writing.",
        "Las facilidades son compartidas dentro del complejo Grand Palladium; confirma por escrito el hotel, el salón asignado y el acceso de los invitados.",
      ),
    ],
    verifiedMaximumCapacity: 500,
    sourceUrl: "https://pro.palladiumhotelgroup.com/en/meetings-and-events",
    sourceLabel: "Palladium Hotel Group",
    forceFallbackSeo: true,
  },
  "secrets-royal-beach-punta-cana": {
    summary: text(
      "An adults-only resort suited to executive groups, incentives, medium-size meetings and destination celebrations.",
      "Un resort solo para adultos adecuado para grupos ejecutivos, incentivos, reuniones medianas y celebraciones de destino.",
    ),
    bestFor: [
      text("Executive meetings", "Reuniones ejecutivas"),
      text("Incentive groups", "Grupos de incentivos"),
      text("Medium conferences", "Conferencias medianas"),
      text("Adults-only social programs", "Programas sociales para adultos"),
    ],
    facts: [
      fact("Published theater capacity", "Capacidad teatro publicada", "500"),
      fact("Published banquet capacity", "Capacidad banquete publicada", "320"),
    ],
    verifiedMaximumCapacity: 500,
    sourceUrl:
      "https://www.hyattinclusivecollection.com/en/resorts-hotels/secrets/dominican-republic/royal-beach-punta-cana/events/meetings-incentives/",
    sourceLabel: "Hyatt Inclusive Collection",
  },
  "dreams-onyx": {
    summary: text(
      "A resort option for group programs that require a central meeting area, accommodation and outdoor resort activities.",
      "Una opción de resort para programas grupales que requieren un área central de reuniones, alojamiento y actividades al aire libre.",
    ),
    bestFor: [
      text("Meetings", "Reuniones"),
      text("Incentive programs", "Programas de incentivos"),
      text("Group celebrations", "Celebraciones grupales"),
    ],
    facts: [
      fact("Published meeting area", "Área de reuniones publicada", "691 m²"),
    ],
    considerations: [
      text(
        "Request the current floor plan before promising capacity because the usable total changes by room division and setup.",
        "Solicita el plano actualizado antes de prometer capacidad porque el total utilizable cambia según la división y el montaje.",
      ),
    ],
    sourceUrl:
      "https://www.hyattinclusivecollection.com/es/resorts-hotels/dreams/republica-dominicana/onyx-resort-spa/eventos/reuniones-e-incentivos/",
    sourceLabel: "Hyatt Inclusive Collection",
  },
  "catalonia-punta-cana": {
    summary: text(
      "A practical resort venue for medium-size meetings, incentive groups and celebrations that do not require a mega convention center.",
      "Un venue de resort práctico para reuniones medianas, grupos de incentivos y celebraciones que no requieren un centro de convenciones de gran escala.",
    ),
    bestFor: [
      text("Medium meetings", "Reuniones medianas"),
      text("Incentive groups", "Grupos de incentivos"),
      text("Social events", "Eventos sociales"),
    ],
    facts: [
      fact("Meeting rooms", "Salones de reuniones", "2"),
      fact("Published combined maximum", "Máximo combinado publicado", "350"),
    ],
    verifiedMaximumCapacity: 350,
    sourceUrl: "https://www.cataloniahotels.com/en/hotel/catalonia-bavaro",
    sourceLabel: "Catalonia Hotels & Resorts",
  },
  "dominican-fiesta-hotel-and-casino-santo-domingo": {
    summary: text(
      "A major Santo Domingo convention venue with a separate event entrance, a large ballroom and flexible infrastructure for high-capacity programs.",
      "Un venue importante de Santo Domingo con entrada independiente, un gran salón e infraestructura flexible para programas de alta capacidad.",
    ),
    bestFor: [
      text("Congresses", "Congresos"),
      text("Trade shows", "Ferias"),
      text("Galas", "Galas"),
      text("Large banquets", "Grandes banquetes"),
    ],
    facts: [
      fact("Ambar ballroom", "Salón Ámbar", "878 m²"),
      fact("Cocktail", "Cóctel", "2,000"),
      fact("Theater", "Teatro", "1,200"),
      fact("Banquet", "Banquete", "800"),
    ],
    verifiedMaximumCapacity: 2000,
    sourceUrl:
      "https://www.palladiumhotelgroup.com/es/hoteles/republicadominicana/santodomingo/dominican-fiesta-hotel/bodas-grupos",
    sourceLabel: "Palladium Hotel Group",
  },
  "barcelo-santo-domingo": {
    summary: text(
      "A central Santo Domingo hotel with several flexible rooms for programs that combine plenary sessions, breakouts, dining and accommodation.",
      "Un hotel céntrico de Santo Domingo con varios salones flexibles para programas que combinan plenarias, sesiones de apoyo, gastronomía y alojamiento.",
    ),
    bestFor: [
      text("Conferences", "Conferencias"),
      text("Corporate meetings", "Reuniones corporativas"),
      text("Galas", "Galas"),
      text("Private celebrations", "Celebraciones privadas"),
    ],
    facts: [
      fact(
        "Published maximum",
        "Máximo publicado",
        "Up to 1,500 / Hasta 1,500",
      ),
    ],
    verifiedMaximumCapacity: 1500,
    sourceUrl: "https://www.barcelo.com/en-us/barcelo-santo-domingo/",
    sourceLabel: "Barceló Hotel Group",
  },
  "crowne-plaza-santo-domingo": {
    summary: text(
      "A strong city option with multiple rooms and a large ballroom for programs that combine presentations, dining, production and guest accommodation.",
      "Una opción sólida en la ciudad con varios salones y un gran salón principal para programas que combinan presentaciones, gastronomía, producción y alojamiento.",
    ),
    bestFor: [
      text("Conferences", "Conferencias"),
      text("Corporate meetings", "Reuniones corporativas"),
      text("Awards dinners", "Cenas de premiación"),
      text("Private celebrations", "Celebraciones privadas"),
    ],
    facts: [
      fact("Event spaces", "Espacios para eventos", "15"),
      fact("Las Americas ballroom", "Salón Las Américas", "805 m²"),
      fact(
        "Published maximum",
        "Máximo publicado",
        "Up to 1,200 / Hasta 1,200",
      ),
    ],
    verifiedMaximumCapacity: 1200,
    sourceUrl:
      "https://www.ihg.com/crowneplaza/hotels/us/en/santo-domingo/sdqha/hoteldetail/events-facilities",
    sourceLabel: "IHG",
  },
  "catalonia-santo-domingo": {
    summary: text(
      "A modern city venue with extensive meeting inventory and integrated screens for conferences, product presentations and corporate events.",
      "Un venue moderno en la ciudad con amplio inventario de salones y pantallas integradas para conferencias, presentaciones de producto y eventos corporativos.",
    ),
    bestFor: [
      text("Conferences", "Conferencias"),
      text("Product presentations", "Presentaciones de producto"),
      text("Corporate meetings", "Reuniones corporativas"),
      text("Social events", "Eventos sociales"),
    ],
    facts: [
      fact("Meeting rooms", "Salones de reuniones", "13"),
      fact("Total event area", "Área total de eventos", "3,000+ m²"),
      fact("Gran Salón maximum", "Máximo del Gran Salón", "700"),
    ],
    verifiedMaximumCapacity: 700,
    sourceUrl:
      "https://www.cataloniahotels.com/es/hotel/catalonia-santo-domingo",
    sourceLabel: "Catalonia Hotels & Resorts",
  },
  "embassy-suites-by-hilton-santo-domingo": {
    summary: text(
      "A central business-hotel option for conferences, training, corporate receptions and meetings with multiple breakout rooms.",
      "Una opción céntrica de hotel de negocios para conferencias, capacitaciones, recepciones corporativas y reuniones con varios salones de apoyo.",
    ),
    bestFor: [
      text("Corporate meetings", "Reuniones corporativas"),
      text("Training programs", "Capacitaciones"),
      text("Receptions", "Recepciones"),
      text("Conferences", "Conferencias"),
    ],
    facts: [
      fact("Meeting rooms", "Salones de reuniones", "11"),
      fact("Total event area", "Área total de eventos", "2,056 m²"),
      fact("Reception maximum", "Máximo recepción", "700"),
      fact("Theater / banquet", "Teatro / banquete", "546 / 510"),
    ],
    verifiedMaximumCapacity: 700,
    sourceUrl:
      "https://www.hilton.com/en/hotels/sdqsdes-embassy-suites-santo-domingo/events/",
    sourceLabel: "Hilton",
  },
  "hodelpa-centro-plaza-santo-domingo": {
    titleOverride: text("Hodelpa Centro Plaza", "Hodelpa Centro Plaza"),
    locationOverride: "Santiago de los Caballeros",
    summary: text(
      "A city-hotel option in central Santiago for business meetings and smaller corporate or social events.",
      "Una opción de hotel urbano en el centro de Santiago para reuniones de negocios y eventos corporativos o sociales de menor escala.",
    ),
    considerations: [
      text(
        "This hotel is in Santiago de los Caballeros, not Santo Domingo. Confirm the selected room and setup capacity before transport is arranged.",
        "Este hotel está en Santiago de los Caballeros, no en Santo Domingo. Confirma el salón y la capacidad por montaje antes de coordinar el transporte.",
      ),
    ],
    sourceUrl: "https://www.hodelpa.com/centro-plaza-hodelpa.html",
    sourceLabel: "Hodelpa Hotels",
    forceFallbackSeo: true,
  },
  "hodelpa-garden-court-santo-domingo": {
    titleOverride: text("Hodelpa Garden Court", "Hodelpa Garden Court"),
    locationOverride: "Santiago de los Caballeros",
    summary: text(
      "A hotel near Cibao International Airport suited to business stays, small meetings and groups operating in Santiago.",
      "Un hotel próximo al Aeropuerto Internacional del Cibao adecuado para viajes de negocios, reuniones pequeñas y grupos que operan en Santiago.",
    ),
    considerations: [
      text(
        "This hotel is in Santiago, near Cibao International Airport, not Santo Domingo. It should be evaluated for small and medium programs rather than large conventions.",
        "Este hotel está en Santiago, cerca del Aeropuerto Internacional del Cibao, no en Santo Domingo. Debe evaluarse para programas pequeños y medianos, no para grandes convenciones.",
      ),
    ],
    sourceUrl: "https://www.hodelpa.com/hodelpa-garden-court.html",
    sourceLabel: "Hodelpa Hotels",
    forceFallbackSeo: true,
  },
  "radisson-hotel-santo-domingo-inn-santo-domingo": {
    titleOverride: text(
      "Radisson Hotel Santo Domingo",
      "Radisson Hotel Santo Domingo",
    ),
    forceFallbackSeo: true,
  },
}

export function getVenuePlanningProfile(slug: string) {
  return VENUE_PLANNING_PROFILES[slug]
}

export function applyVenueDataCorrections<
  T extends {
    slug?: { current?: string }
    title?: LocalizedText
    location?: { location?: string }
  },
>(venue: T): T & { verifiedMaximumCapacity?: number } {
  const slug = venue.slug?.current
  const profile = slug ? getVenuePlanningProfile(slug) : undefined

  if (!profile) return venue

  return {
    ...venue,
    ...(profile.titleOverride && { title: profile.titleOverride }),
    ...(profile.locationOverride && {
      location: {
        ...(venue.location || {}),
        location: profile.locationOverride,
      },
    }),
    ...(profile.verifiedMaximumCapacity && {
      verifiedMaximumCapacity: profile.verifiedMaximumCapacity,
    }),
  }
}
