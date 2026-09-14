import type { Metadata } from "next"
export type Locale = "en" | "es"
export type Copy = Record<Locale, string>
export const copy = (en: string, es: string): Copy => ({ en, es })
export const prefix = (locale: Locale) => (locale === "es" ? "/es" : "")
export const SITE = "https://puntacanavenuecollection.com"
export const rfpLabel = copy("Submit Your RFP", "Enviar RFP")
export interface Capability {
  slug: string
  title: Copy
  summary: Copy
  scope: Copy[]
  output: Copy
  image: string
}
export const capabilities: Capability[] = [
  {
    slug: "strategy-planning",
    title: copy("Strategy & Planning", "Estrategia y planificación"),
    summary: copy(
      "A clear operating plan, built around the purpose of your meeting.",
      "Un plan operativo diseñado alrededor de los objetivos de tu reunión.",
    ),
    scope: [
      copy(
        "Discovery, objectives and event concept",
        "Discovery, objetivos y concepto del evento",
      ),
      copy(
        "Budget development, scope and supplier coordination",
        "Presupuesto, alcance y coordinación de proveedores",
      ),
      copy(
        "Master schedule, run of show and contingency planning",
        "Cronograma maestro, guion operativo y contingencias",
      ),
    ],
    output: copy(
      "We connect the brief to a working scope, budget and responsibility map. Decisions, dependencies and approval points are made visible before production begins.",
      "Conectamos el brief con un alcance, presupuesto y mapa de responsabilidades. Definimos decisiones, dependencias y aprobaciones antes de comenzar la producción.",
    ),
    image: "planning",
  },
  {
    slug: "event-design",
    title: copy("Creative & Event Design", "Creatividad y diseño de eventos"),
    summary: copy(
      "Turn business objectives into a coherent physical experience.",
      "Convertimos los objetivos empresariales en una experiencia física coherente.",
    ),
    scope: [
      copy(
        "Creative direction, concepts, sketches and 3D renders",
        "Dirección creativa, conceptos, bocetos y renders 3D",
      ),
      copy(
        "Stage design, floor plans and guest-flow layouts",
        "Diseño de escenarios, planos y flujos de asistentes",
      ),
      copy(
        "Branding, furniture, décor and lighting concepts",
        "Branding, mobiliario, decoración e iluminación",
      ),
    ],
    output: copy(
      "The concept becomes a spatial plan and visual presentation for review. Approved designs are translated into fabrication, technical and installation requirements.",
      "El concepto se convierte en una propuesta visual y espacial para revisión. Los diseños aprobados se traducen en requisitos de fabricación, técnica e instalación.",
    ),
    image: "design",
  },
  {
    slug: "venue-hotel-sourcing",
    title: copy("Venue & Hotel Sourcing", "Selección de venues y hoteles"),
    summary: copy(
      "The right setting for the operation, not just the guest count.",
      "El espacio adecuado para toda la operación, más allá del aforo.",
    ),
    scope: [
      copy(
        "Venue comparisons, site inspections and production feasibility",
        "Comparativas, inspecciones y viabilidad de producción",
      ),
      copy(
        "Conference hotels, meeting rooms and room blocks",
        "Hoteles de conferencias, salones y bloques de habitaciones",
      ),
      copy(
        "Access, vendor policies, internet and weather backup",
        "Accesos, políticas de proveedores, internet y alternativa climática",
      ),
    ],
    output: copy(
      "We compare meeting space, accommodation and production requirements as one decision. Hotel room charges may be contracted directly with the hotel; our scope defines sourcing, negotiation support and coordination.",
      "Evaluamos espacio, alojamiento y producción como una sola decisión. Las habitaciones pueden contratarse directamente con el hotel; nuestro alcance define la selección, apoyo a la negociación y coordinación.",
    ),
    image: "ballroom",
  },
  {
    slug: "event-production",
    title: copy("Event Production", "Producción de eventos"),
    summary: copy(
      "From the stage structure to the final cue, one coordinated production.",
      "Desde la estructura del escenario hasta la última señal, una producción coordinada.",
    ),
    scope: [
      copy(
        "Stages, LED walls, truss, rigging and power distribution",
        "Escenarios, pantallas LED, truss, rigging y distribución eléctrica",
      ),
      copy(
        "Technical direction, crew, rehearsals and show calling",
        "Dirección técnica, equipos, ensayos y dirección del show",
      ),
      copy(
        "Load-in, installation, production supervision and breakdown",
        "Carga, instalación, supervisión de producción y desmontaje",
      ),
    ],
    output: copy(
      "We coordinate technical suppliers against the approved design, schedule and venue restrictions. Power, access, rehearsals and show-day responsibilities are planned together.",
      "Coordinamos a los proveedores técnicos según el diseño aprobado, el calendario y las restricciones del venue. Energía, accesos, ensayos y responsabilidades se planifican en conjunto.",
    ),
    image: "production",
  },
  {
    slug: "av-technology",
    title: copy("AV & Conference Technology", "Audiovisuales y tecnología"),
    summary: copy(
      "Help every message reach the room and the audience beyond it.",
      "Hacemos que cada mensaje llegue a la sala y a quienes participan a distancia.",
    ),
    scope: [
      copy(
        "Audio, microphones, projection, LED and lighting",
        "Audio, micrófonos, proyección, LED e iluminación",
      ),
      copy(
        "Presentation management, recording and streaming",
        "Gestión de presentaciones, grabación y streaming",
      ),
      copy(
        "Interpretation, connectivity and technical operators as required",
        "Interpretación, conectividad y operadores según el proyecto",
      ),
    ],
    output: copy(
      "We define the signal flow, speaker requirements and technical resources with your team. Connectivity and interpretation needs are scoped before equipment and operator schedules are confirmed.",
      "Definimos señales, necesidades de ponentes y recursos técnicos con tu equipo. La conectividad e interpretación se incluyen en el alcance antes de confirmar equipos y operadores.",
    ),
    image: "control-room",
  },
  {
    slug: "exhibitions",
    title: copy("Exhibitions & Stands", "Exposiciones y stands"),
    summary: copy(
      "Build a place for brands, sponsors and business conversations.",
      "Creamos espacios para marcas, patrocinadores y conversaciones de negocio.",
    ),
    scope: [
      copy(
        "Custom and modular stands, sponsor booths and product displays",
        "Stands personalizados y modulares, patrocinadores y displays",
      ),
      copy(
        "Exhibition layouts, counters and registration structures",
        "Planos de exposición, mostradores y estructuras de registro",
      ),
      copy(
        "Fabrication, installation and dismantling",
        "Fabricación, instalación y desmontaje",
      ),
    ],
    output: copy(
      "We coordinate design, fabrication and installation around exhibitor requirements, circulation and venue access. Sponsor deliverables and production deadlines are tracked as part of the event plan.",
      "Coordinamos diseño, fabricación e instalación según los requisitos de expositores, circulación y accesos. Los entregables de patrocinadores y plazos forman parte del plan del evento.",
    ),
    image: "exhibitions",
  },
  {
    slug: "printing-branding",
    title: copy(
      "Printing & Corporate Branding",
      "Impresión y branding corporativo",
    ),
    summary: copy(
      "One visual language, down to the badge in every attendee’s hand.",
      "Un lenguaje visual coherente, hasta la acreditación de cada asistente.",
    ),
    scope: [
      copy(
        "Badges, credentials, lanyards and attendee kits",
        "Gafetes, credenciales, lanyards y kits de asistentes",
      ),
      copy(
        "Wayfinding, welcome signs, maps and printed agendas",
        "Señalética, bienvenidas, mapas y agendas impresas",
      ),
      copy(
        "Stage graphics, sponsor graphics, backdrops and banners",
        "Gráficos de escenario, patrocinadores, fondos y banners",
      ),
    ],
    output: copy(
      "Artwork approval, dimensions, quantities and installation positions are coordinated in one production schedule. Your team reviews proofs before printing.",
      "La aprobación de artes, medidas, cantidades y ubicaciones se coordina en un calendario de producción. Tu equipo revisa las pruebas antes de imprimir.",
    ),
    image: "registration",
  },
  {
    slug: "transportation-logistics",
    title: copy("Transportation & Logistics", "Transporte y logística"),
    summary: copy(
      "Move the whole program with a plan for every arrival and departure.",
      "Movemos todo el programa con un plan para cada llegada y salida.",
    ),
    scope: [
      copy(
        "Airport transfers, executive vehicles, coaches and venue shuttles",
        "Traslados de aeropuerto, vehículos ejecutivos, autobuses y shuttles",
      ),
      copy(
        "Manifests, vehicle schedules and arrival coordination",
        "Manifiestos, programación de vehículos y coordinación de llegadas",
      ),
      copy(
        "VIP movements, staff transport and departure management",
        "Movimientos VIP, transporte de personal y salidas",
      ),
    ],
    output: copy(
      "We align passenger manifests, flight information and vehicle capacity with the event schedule. Dispatch responsibilities and changes are coordinated through the local operation.",
      "Alineamos manifiestos, vuelos y capacidad de vehículos con el programa. La operación local coordina despachos, responsables y cambios.",
    ),
    image: "transportation",
  },
  {
    slug: "guest-management",
    title: copy(
      "Registration & Guest Management",
      "Registro y atención de asistentes",
    ),
    summary: copy(
      "Make the first arrival as considered as the main session.",
      "Cuidamos la llegada con la misma atención que la sesión principal.",
    ),
    scope: [
      copy(
        "Registration desks, check-in and credential distribution",
        "Mesas de registro, check-in y entrega de credenciales",
      ),
      copy(
        "Bilingual staff, hospitality desks and attendee assistance",
        "Personal bilingüe, mesas de hospitalidad y atención",
      ),
      copy(
        "VIP coordination, guest flow and information points",
        "Coordinación VIP, flujo de invitados y puntos de información",
      ),
    ],
    output: copy(
      "We plan staffing, registration flow and information handoffs to keep guests moving. Rooming lists and arrival data are coordinated only with the teams that need them to operate.",
      "Planificamos personal, flujos de registro y entrega de información para facilitar el movimiento. Las listas de habitaciones y llegadas se coordinan con los equipos que las necesitan para operar.",
    ),
    image: "registration",
  },
  {
    slug: "corporate-hospitality",
    title: copy("Corporate Hospitality", "Hospitalidad corporativa"),
    summary: copy(
      "Hospitality that supports the meeting, throughout the program.",
      "Hospitalidad al servicio de la reunión durante todo el programa.",
    ),
    scope: [
      copy(
        "Coffee breaks, conference catering and networking receptions",
        "Coffee breaks, catering de conferencias y recepciones",
      ),
      copy(
        "Corporate dinners, gala programs and VIP hospitality",
        "Cenas corporativas, galas y atención VIP",
      ),
      copy(
        "Rooming lists, hotel coordination and group arrivals",
        "Rooming lists, coordinación hotelera y llegadas de grupos",
      ),
    ],
    output: copy(
      "Meal service, dietary requirements and hospitality timings are integrated with sessions and transportation. Hotel, catering and off-site teams work to the same operating schedule.",
      "Los servicios de alimentos, requisitos dietéticos y horarios de hospitalidad se integran con sesiones y transporte. Hoteles, catering y equipos externos siguen el mismo cronograma.",
    ),
    image: "networking",
  },
  {
    slug: "entertainment-experiences",
    title: copy(
      "Entertainment & Corporate Experiences",
      "Entretenimiento y experiencias corporativas",
    ),
    summary: copy(
      "The right complement to a conference, incentive or recognition program.",
      "El complemento adecuado para conferencias, incentivos y reconocimiento.",
    ),
    scope: [
      copy(
        "Presenters, MCs, bands, musicians and cultural performances",
        "Presentadores, maestros de ceremonia, bandas y espectáculos culturales",
      ),
      copy(
        "Team activities, golf and private destination experiences",
        "Actividades de equipo, golf y experiencias privadas",
      ),
      copy(
        "Technical requirements, guest movement and program integration",
        "Requisitos técnicos, movimiento de invitados e integración",
      ),
    ],
    output: copy(
      "Experiences are selected around your program objectives, guest profile and operating constraints. We coordinate access, transportation, technical riders and the return to the main program.",
      "Seleccionamos experiencias según los objetivos, perfil de asistentes y condiciones operativas. Coordinamos accesos, transporte, riders técnicos y regreso al programa principal.",
    ),
    image: "gala",
  },
  {
    slug: "photography-content",
    title: copy(
      "Photography, Video & Content",
      "Fotografía, video y contenido",
    ),
    summary: copy(
      "Capture the people, messages and moments that matter to the business.",
      "Documentamos a las personas, mensajes y momentos relevantes para la empresa.",
    ),
    scope: [
      copy(
        "Conference photography, executive portraits and interviews",
        "Fotografía de conferencias, retratos ejecutivos y entrevistas",
      ),
      copy(
        "Recap videos, recordings and corporate content",
        "Videos resumen, grabaciones y contenido corporativo",
      ),
      copy(
        "Drone and same-day content where permitted and arranged",
        "Dron y contenido en el día cuando se autorice y acuerde",
      ),
    ],
    output: copy(
      "We scope the shot list, permissions, access and delivery requirements with your communications team. Content production is scheduled around the event without disrupting sessions.",
      "Definimos tomas, permisos, accesos y entregas con tu equipo de comunicación. La producción de contenido se integra al evento sin interrumpir las sesiones.",
    ),
    image: "launch",
  },
  {
    slug: "onsite-operations",
    title: copy("On-Site Operations", "Operación en sitio"),
    summary: copy(
      "One accountable local team, from the first load-in to final closeout.",
      "Un equipo local responsable, desde la primera carga hasta el cierre.",
    ),
    scope: [
      copy(
        "Supplier check-in, setup, rehearsals and event direction",
        "Ingreso de proveedores, montaje, ensayos y dirección del evento",
      ),
      copy(
        "Schedule control, guest logistics and live troubleshooting",
        "Control del cronograma, logística y resolución de imprevistos",
      ),
      copy(
        "Breakdown, load-out and final reconciliation",
        "Desmontaje, salida de equipos y conciliación final",
      ),
    ],
    output: copy(
      "Project managers, production professionals and specialist suppliers operate to one plan. We coordinate decisions on site and keep your team informed as the program moves from session to session.",
      "Directores de proyecto, profesionales de producción y proveedores especializados operan con un plan común. Coordinamos decisiones en sitio y mantenemos informado a tu equipo durante el programa.",
    ),
    image: "operations",
  },
]
export const eventTypes = [
  {
    slug: "conferences",
    title: copy("Conferences & Conventions", "Conferencias y convenciones"),
    focus: copy(
      "Plenary sessions, breakouts and exhibitions connected by one operating plan.",
      "Plenarias, sesiones paralelas y exposiciones conectadas por un plan operativo.",
    ),
    requirements: copy(
      "Session formats, speaker requirements, interpretation, registration peaks and sponsor commitments shape the venue and production brief.",
      "Los formatos de sesión, ponentes, interpretación, picos de registro y compromisos con patrocinadores definen el brief del venue y la producción.",
    ),
  },
  {
    slug: "annual-meetings",
    title: copy("Annual Meetings", "Reuniones anuales"),
    focus: copy(
      "Bring the company together around a clear agenda and shared objectives.",
      "Reunimos a la empresa alrededor de una agenda clara y objetivos compartidos.",
    ),
    requirements: copy(
      "We connect accommodation, leadership sessions, company presentations and closing events in a multi-day schedule with clear responsibilities.",
      "Integramos alojamiento, sesiones de liderazgo, presentaciones y eventos de cierre en un programa de varios días con responsabilidades claras.",
    ),
  },
  {
    slug: "sales-kickoffs",
    title: copy("Sales Kickoffs", "Kickoffs de ventas"),
    focus: copy(
      "A focused start for your sales organization, from the main stage to team sessions.",
      "Un inicio enfocado para tu organización comercial, del escenario a las sesiones de equipo.",
    ),
    requirements: copy(
      "The plan considers presentations, training rooms, regional teams, product demonstrations and recognition moments alongside guest logistics.",
      "El plan contempla presentaciones, salas de formación, equipos regionales, demostraciones y reconocimiento junto con la logística de asistentes.",
    ),
  },
  {
    slug: "global-meetings",
    title: copy("Global Company Meetings", "Reuniones globales de empresa"),
    focus: copy(
      "Coordinate a multinational gathering through one local operation.",
      "Coordinamos un encuentro multinacional mediante una operación local integrada.",
    ),
    requirements: copy(
      "Arrival waves, language requirements, time zones and multi-day hospitality are planned alongside the business agenda.",
      "Las oleadas de llegadas, idiomas, zonas horarias y hospitalidad se planifican junto con la agenda empresarial.",
    ),
  },
  {
    slug: "corporate-summits",
    title: copy("Corporate Summits", "Cumbres corporativas"),
    focus: copy(
      "An environment built for leadership, strategy and consequential conversations.",
      "Un entorno diseñado para liderazgo, estrategia y conversaciones decisivas.",
    ),
    requirements: copy(
      "Privacy, access, meeting formats, executive transportation and discreet guest support guide the operating plan. Complexity matters more than a rigid attendee minimum.",
      "La privacidad, accesos, formatos, transporte ejecutivo y atención discreta guían el plan. La complejidad importa más que un mínimo rígido de asistentes.",
    ),
  },
  {
    slug: "product-launches",
    title: copy("Product Launches", "Lanzamientos de producto"),
    focus: copy(
      "Create the physical setting and technical production for your reveal.",
      "Creamos el entorno y la producción técnica para presentar tu producto.",
    ),
    requirements: copy(
      "We coordinate reveal sequences, demonstration areas, branded fabrication, media access and rehearsals against the approved creative brief.",
      "Coordinamos secuencias de presentación, demostraciones, fabricación de marca, acceso de medios y ensayos según el brief creativo aprobado.",
    ),
  },
  {
    slug: "partner-meetings",
    title: copy(
      "Dealer & Partner Meetings",
      "Encuentros de distribuidores y socios",
    ),
    focus: copy(
      "Connect your commercial network through meetings, demonstrations and hospitality.",
      "Conectamos tu red comercial mediante reuniones, demostraciones y hospitalidad.",
    ),
    requirements: copy(
      "Dealer sessions, partner showcases, sponsor areas and networking require coordinated floor plans, registration and technical support.",
      "Las sesiones de distribuidores, exhibiciones, patrocinadores y networking necesitan planos, registro y soporte técnico coordinados.",
    ),
  },
  {
    slug: "trade-events",
    title: copy(
      "Exhibitions & Trade Events",
      "Exposiciones y eventos comerciales",
    ),
    focus: copy(
      "Build the environment for exhibitors, sponsors and business audiences.",
      "Creamos el entorno para expositores, patrocinadores y audiencias empresariales.",
    ),
    requirements: copy(
      "Exhibitor requirements, floor loading, electrical distribution, fabrication and installation windows are assessed before the hall plan is finalized.",
      "Los requisitos de expositores, cargas, distribución eléctrica, fabricación y ventanas de instalación se evalúan antes de cerrar el plano.",
    ),
  },
  {
    slug: "incentive-programs",
    title: copy(
      "Corporate Incentive Programs",
      "Programas de incentivos corporativos",
    ),
    focus: copy(
      "Recognition programs with the operational care of a corporate meeting.",
      "Programas de reconocimiento con el cuidado operativo de una reunión corporativa.",
    ),
    requirements: copy(
      "We integrate room blocks, arrival logistics, recognition events, dining and destination experiences around the objectives of your program.",
      "Integramos habitaciones, llegadas, reconocimiento, cenas y experiencias de destino alrededor de los objetivos del programa.",
    ),
  },
  {
    slug: "awards-galas",
    title: copy("Awards & Gala Programs", "Programas de premios y galas"),
    focus: copy(
      "A considered closing chapter within a larger corporate program.",
      "Un cierre cuidado dentro de un programa corporativo más amplio.",
    ),
    requirements: copy(
      "Award sequences, stage cues, presenters, entertainment and banquet service are rehearsed and operated as one production.",
      "Las secuencias de premios, señales técnicas, presentadores, entretenimiento y banquete se ensayan y operan como una producción integral.",
    ),
  },
]
export const steps = [
  copy("Send us your brief", "Envíanos tu brief"),
  copy("We build the strategy", "Construimos la estrategia"),
  copy("We develop the proposal", "Desarrollamos la propuesta"),
  copy("Review & refine", "Revisamos y ajustamos"),
  copy("Approval & deposit", "Aprobación y depósito"),
  copy("We coordinate everything", "Coordinamos todo"),
  copy("We operate the event", "Operamos el evento"),
  copy("Breakdown & closeout", "Desmontaje y cierre"),
]
export const stepDescriptions = [
  copy(
    "Objectives, dates, attendance and scope.",
    "Objetivos, fechas, asistentes y alcance.",
  ),
  copy(
    "Destination, venues, production and logistics.",
    "Destino, venues, producción y logística.",
  ),
  copy(
    "A defined scope and detailed quotation.",
    "Alcance definido y cotización detallada.",
  ),
  copy(
    "Adjust the project with your team.",
    "Ajustamos el proyecto con tu equipo.",
  ),
  copy(
    "Contract and deposit before production begins.",
    "Contrato y depósito antes de iniciar producción.",
  ),
  copy(
    "Suppliers, venues, hotels and technical delivery.",
    "Proveedores, venues, hoteles y ejecución técnica.",
  ),
  copy(
    "On-site direction and coordinated guest operations.",
    "Dirección en sitio y operación de asistentes.",
  ),
  copy(
    "Load-out, reconciliation and project closeout.",
    "Salida de equipos, conciliación y cierre.",
  ),
]
export const destinations = [
  "Punta Cana",
  "Cap Cana",
  "Santo Domingo",
  "La Romana",
  "Casa de Campo",
  "Bayahibe",
  "Miches",
  "Puerto Plata",
  "Samaná",
]
export const nav = [
  ["/what-we-do", copy("What We Do", "Qué hacemos")],
  ["/corporate-events", copy("Corporate Events", "Eventos corporativos")],
  ["/venues", copy("Venues", "Venues")],
  ["/destinations", copy("Destinations", "Destinos")],
  ["/for-agencies", copy("For Agencies", "Para agencias")],
  ["/about", copy("About", "Nosotros")],
] as const
export function metadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = SITE + prefix(locale) + path
  return {
    title: title + " | PCVC",
    description,
    alternates: {
      canonical: url,
      languages: {
        en: SITE + path,
        es: SITE + "/es" + path,
        "x-default": SITE + path,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: locale === "es" ? "es_DO" : "en_US",
      images: [
        {
          url: "/images/corporate/conference.webp",
          width: 1672,
          height: 941,
          alt:
            locale === "es"
              ? "Conferencia corporativa — imagen conceptual"
              : "Corporate conference — conceptual imagery",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/corporate/conference.webp"],
    },
  }
}
