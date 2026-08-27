export type Locale = "en" | "es"

export const corporateIntentSlugs = [
  "executive-retreats",
  "company-offsites",
  "conferences",
  "incentive-travel",
  "team-building",
  "leadership-meetings",
] as const

export type CorporateIntentSlug = (typeof corporateIntentSlugs)[number]

type LocalizedText = Record<Locale, string>

export interface CorporateIntent {
  slug: CorporateIntentSlug
  title: LocalizedText
  shortDescription: LocalizedText
  metaDescription: LocalizedText
  idealFor: Record<Locale, string[]>
  priorities: Record<Locale, string[]>
}

export const corporateIntents: CorporateIntent[] = [
  {
    slug: "executive-retreats",
    title: { en: "Executive Retreats", es: "Retiros ejecutivos" },
    shortDescription: {
      en: "Private settings for focused leadership work, confidential conversations and restorative time together.",
      es: "Espacios privados para trabajo estratégico, conversaciones confidenciales y tiempo de calidad en equipo.",
    },
    metaDescription: {
      en: "White-label local execution for executive retreats in the Dominican Republic, including venues, transport, production, activities and on-site operations.",
      es: "Ejecución local white-label para retiros ejecutivos en República Dominicana: venues, transporte, producción, actividades y operación presencial.",
    },
    idealFor: {
      en: [
        "Board and C-suite retreats",
        "Annual strategy sessions",
        "Leadership alignment programs",
      ],
      es: [
        "Retiros de juntas y alta dirección",
        "Sesiones anuales de estrategia",
        "Programas de alineación de liderazgo",
      ],
    },
    priorities: {
      en: [
        "Privacy and controlled access",
        "Comfortable meeting space",
        "Reliable connectivity and transfers",
      ],
      es: [
        "Privacidad y acceso controlado",
        "Espacios cómodos de reunión",
        "Conectividad y traslados confiables",
      ],
    },
  },
  {
    slug: "company-offsites",
    title: { en: "Company Offsites", es: "Offsites empresariales" },
    shortDescription: {
      en: "Flexible venues that balance productive work sessions with memorable destination experiences.",
      es: "Venues flexibles que equilibran sesiones productivas con experiencias memorables en el destino.",
    },
    metaDescription: {
      en: "Operate company offsites in the Dominican Republic under your agency brand with local venues, suppliers, logistics, production and guest support.",
      es: "Opera offsites corporativos en República Dominicana bajo la marca de tu agencia, con venues, proveedores, logística, producción y atención a invitados.",
    },
    idealFor: {
      en: [
        "Planning and innovation sessions",
        "Department gatherings",
        "Remote-team meetups",
      ],
      es: [
        "Sesiones de planificación e innovación",
        "Encuentros departamentales",
        "Reuniones de equipos remotos",
      ],
    },
    priorities: {
      en: [
        "Flexible meeting layouts",
        "Convenient group logistics",
        "Indoor and outdoor program options",
      ],
      es: [
        "Montajes de reunión flexibles",
        "Logística grupal conveniente",
        "Opciones interiores y exteriores",
      ],
    },
  },
  {
    slug: "conferences",
    title: { en: "Conferences & Meetings", es: "Conferencias y reuniones" },
    shortDescription: {
      en: "Conference-ready hotels and venues selected for capacity, production needs and attendee flow.",
      es: "Hoteles y venues seleccionados por capacidad, producción técnica y flujo de asistentes.",
    },
    metaDescription: {
      en: "White-label conference operations in the Dominican Republic with venue coordination, audiovisual production, transportation and local event teams.",
      es: "Operación white-label de conferencias en República Dominicana con coordinación de venue, producción audiovisual, transporte y equipo local.",
    },
    idealFor: {
      en: [
        "Annual conferences",
        "Sales meetings",
        "Product and partner events",
      ],
      es: [
        "Conferencias anuales",
        "Reuniones de ventas",
        "Eventos de producto y socios",
      ],
    },
    priorities: {
      en: [
        "Room capacity and breakouts",
        "Audiovisual and internet readiness",
        "Registration and attendee circulation",
      ],
      es: [
        "Capacidad y salones auxiliares",
        "Audiovisuales e internet",
        "Registro y circulación de asistentes",
      ],
    },
  },
  {
    slug: "incentive-travel",
    title: { en: "Incentive Travel", es: "Viajes de incentivo" },
    shortDescription: {
      en: "Resorts and destination experiences designed to reward performance and strengthen relationships.",
      es: "Resorts y experiencias de destino para reconocer resultados y fortalecer relaciones.",
    },
    metaDescription: {
      en: "Deliver incentive programs in the Dominican Republic with one white-label team coordinating hotels, transport, activities, private events and guests.",
      es: "Ejecuta programas de incentivo en República Dominicana con un equipo white-label que coordina hoteles, transporte, actividades, eventos e invitados.",
    },
    idealFor: {
      en: [
        "Top-performer rewards",
        "Client appreciation trips",
        "Partner recognition programs",
      ],
      es: [
        "Reconocimiento a colaboradores",
        "Viajes para clientes",
        "Programas de socios",
      ],
    },
    priorities: {
      en: [
        "Group-friendly resort experience",
        "Private celebrations",
        "Seamless arrival and activity logistics",
      ],
      es: [
        "Experiencia adecuada para grupos",
        "Celebraciones privadas",
        "Logística fluida de llegadas y actividades",
      ],
    },
  },
  {
    slug: "team-building",
    title: { en: "Team Building", es: "Integración de equipos" },
    shortDescription: {
      en: "Venues and activity settings that help teams connect through shared, well-organized experiences.",
      es: "Venues y espacios de actividades para conectar equipos mediante experiencias bien organizadas.",
    },
    metaDescription: {
      en: "Run team-building programs across the Dominican Republic with white-label local logistics, activities, venues, production and participant support.",
      es: "Realiza programas de integración en República Dominicana con logística white-label, actividades, venues, producción y atención a participantes.",
    },
    idealFor: {
      en: [
        "New-team integration",
        "Culture and engagement programs",
        "Collaborative challenges",
      ],
      es: [
        "Integración de nuevos equipos",
        "Programas de cultura y compromiso",
        "Retos colaborativos",
      ],
    },
    priorities: {
      en: [
        "Safe activity areas",
        "Weather alternatives",
        "Space for briefing and debriefing",
      ],
      es: [
        "Áreas seguras para actividades",
        "Alternativas por clima",
        "Espacios para instrucciones y cierre",
      ],
    },
  },
  {
    slug: "leadership-meetings",
    title: { en: "Leadership Meetings", es: "Reuniones de liderazgo" },
    shortDescription: {
      en: "Professional, discreet venues for decision-making, workshops and senior-team alignment.",
      es: "Venues profesionales y discretos para decisiones, talleres y alineación de equipos directivos.",
    },
    metaDescription: {
      en: "White-label local operations for leadership meetings in the Dominican Republic, with private venues, reliable technology and discreet execution.",
      es: "Operación local white-label para reuniones de liderazgo en República Dominicana, con venues privados, tecnología confiable y ejecución discreta.",
    },
    idealFor: {
      en: [
        "Executive workshops",
        "Quarterly business reviews",
        "Senior leadership summits",
      ],
      es: [
        "Talleres ejecutivos",
        "Revisiones trimestrales",
        "Cumbres de liderazgo",
      ],
    },
    priorities: {
      en: [
        "Discreet meeting environment",
        "Presentation and hybrid-meeting support",
        "Efficient executive transport",
      ],
      es: [
        "Entorno de reunión discreto",
        "Soporte para presentaciones e híbridos",
        "Transporte ejecutivo eficiente",
      ],
    },
  },
]

export const homeCorporateCopy = {
  en: {
    eyebrow: "White-label event operations in the Dominican Republic",
    heroTitle: "Your Local Event Team in the Dominican Republic",
    heroSubtitle:
      "We operate behind your agency brand, represent you on the ground and execute every part of your client’s program in Punta Cana and throughout the country.",
    primaryCta: "Discuss a White-Label Program",
    secondaryCta: "Explore Our Capabilities",
    planningEyebrow: "Built for agencies and planners",
    planningTitle: "Your brand in front. Our local operation behind it.",
    planningIntro:
      "Bring us the brief and choose how visible we should be. We can work in your uniforms, follow your service standards and manage venues, suppliers, production, transport and guest operations as your local representative.",
    processEyebrow: "One accountable local partner",
    processTitle: "From client brief to complete destination execution",
    processSteps: [
      [
        "1. Define the operating model",
        "Share the brief, brand standards, client relationship and the responsibilities you want us to assume.",
      ],
      [
        "2. Build the local solution",
        "We source venues and suppliers, validate logistics, coordinate complimentary inspections and prepare the operating plan.",
      ],
      [
        "3. Execute under your brand",
        "Our local team manages production, transportation, activities, guests and on-site delivery while protecting your agency relationship.",
      ],
    ],
    formEyebrow: "Build your local delivery team",
    formTitle: "Tell us what you need executed",
    formIntro:
      "A local operations specialist will review the brief and respond with a practical white-label delivery plan.",
  },
  es: {
    eyebrow: "Operación white-label de eventos en República Dominicana",
    heroTitle: "Tu equipo local de eventos en República Dominicana",
    heroSubtitle:
      "Operamos detrás de la marca de tu agencia, te representamos en el destino y ejecutamos cada parte del programa de tu cliente en Punta Cana y todo el país.",
    primaryCta: "Hablar de un programa white-label",
    secondaryCta: "Explorar nuestras capacidades",
    planningEyebrow: "Creado para agencias y planners",
    planningTitle: "Tu marca al frente. Nuestra operación local detrás.",
    planningIntro:
      "Envíanos el brief y define qué tan visibles debemos ser. Podemos utilizar tus uniformes, seguir tus estándares y manejar venues, proveedores, producción, transporte y operación de invitados como tu representante local.",
    processEyebrow: "Un socio local responsable",
    processTitle: "Del brief del cliente a la ejecución completa en destino",
    processSteps: [
      [
        "1. Define el modelo operativo",
        "Comparte el brief, los estándares de marca, la relación con el cliente y las responsabilidades que debemos asumir.",
      ],
      [
        "2. Construimos la solución local",
        "Buscamos venues y proveedores, validamos la logística, coordinamos inspecciones gratuitas y preparamos el plan operativo.",
      ],
      [
        "3. Ejecutamos bajo tu marca",
        "Nuestro equipo maneja producción, transporte, actividades, invitados y operación en sitio protegiendo la relación de tu agencia.",
      ],
    ],
    formEyebrow: "Construye tu equipo local",
    formTitle: "Cuéntanos qué necesitas ejecutar",
    formIntro:
      "Un especialista en operaciones locales revisará el brief y responderá con un plan práctico de ejecución white-label.",
  },
} as const

export function getCorporateIntent(slug: string) {
  return corporateIntents.find(item => item.slug === slug)
}
