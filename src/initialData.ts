import { CVData } from './types';

export const initialCVData: CVData = {
  settings: {
    sidebarWidth: 35,
    contentPadding: 24,
    experienceWidth: 96,
    sidebarPadding: 32,
    sectionSpacing: 40,
    itemSpacing: 24,
    headerSpacing: 48,
    nameFontSize: 26,
    titleFontSize: 9,
    sectionTitleFontSize: 11,
    bodyFontSize: 7.8,
    sidebarTitleFontSize: 10,
    sidebarBodyFontSize: 8.5
  },
  personal: {
    name: "TOM HAUGEPLASS",
    title: "APPLIKASJONSFORVALTNING · LEVERANDØROPPFØLGING · IT-KOORDINERING",
    subtitle: "OM MEG",
    summary: "Erfaren IT-koordinator med bakgrunn som produktleder, med lang fartstid i å følge opp applikasjoner, leverandører, systemeiere og brukere på tvers av utvikling, drift, support og forretning. Har hatt operativt ansvar for risikovurdering, avhengigheter, testing og produksjonssetting av 40+ endringer i en plattform med over 1 million brukere, og vært selskapets interne kontaktpunkt for feilmeldinger og brukerhenvendelser. Teknisk fundament fra fagbrev i IKT-driftsfag. Strukturert og selvgående, og komfortabel med mange baller i luften samtidig. Søker nå en rolle innen applikasjonsforvaltning og IT-koordinering. Tilgjengelig på kort varsel.",
    contact: {
      location: "Oslo",
      phone: "+47 472 34 017",
      email: "tomhaugeplass@gmail.com"
    }
  },
  experience: [
    {
      id: "exp2",
      company: "FOODORA NORWAY",
      location: "Oslo",
      role: "Senior Product Manager & Team Lead",
      period: "2022 – 2025",
      description: "Operativt ansvar for å følge opp applikasjoner, endringer og leverandører i en global plattform med over 1 million norske brukere.",
      bullets: [
        "Koordinerte og kvalitetssikret 40+ endringer og feilmeldinger innen betaling, integrasjoner, UX og funksjonalitet — med ansvar for risikovurdering, avhengigheter, testing og koordinert utrulling i samarbeid med tekniske team og leverandører.",
        "Var selskapets interne kontaktpunkt for produktrelaterte spørsmål og support — tilsvarende et brukerforum — og fulgte opp feilrapporter og forbedringsforslag; oversatte tekniske beslutninger for ikke-tekniske interessenter.",
        "Koordinerte leverandøroppfølging av eksterne betalings- og innloggingsleverandører (Vipps Direct, Trustly, Klarna, BankID) ved nye integrasjoner og endringer.",
        "Sikret testing, kommunikasjon og oppfølging før og etter produksjonssetting; vurderte konsekvenser og bruker-/forretningspåvirkning ved større endringer.",
        "Teamleder med personalansvar — medarbeidersamtaler, utviklingsplaner og rekruttering; representerte produktteamet overfor ledelsen og den globale organisasjonen.",
        "Evaluerte gjennomførte endringer og rapporterte produkt- og leveranse-KPI-er månedlig til ledelsen gjennom egenbygde Looker-dashboards på BigQuery-data."
      ]
    },
    {
      id: "exp3",
      company: "BEMBER AS",
      location: "Oslo",
      role: "Produktleder",
      period: "2018 – 2022",
      description: "Koordinerte tekniske endringer og leverandørintegrasjoner for Parklink, som vokste fra 50 000 til 600 000 brukere; tett daglig samarbeid med DevOps-team om drift, prioritering og oppfølging.",
      bullets: [
        "Koordinerte lansering av nye selvbetjente tjenester og leverandørintegrasjoner (avtaleparkering, Trumf-integrasjon, firmakonto) mot sluttbrukere, kunder og partnere.",
        "Identifiserte og automatiserte interne supportprosesser — reduserte manuelt arbeid og doblet prosesseffektiviteten."
      ]
    },
    {
      id: "exp4",
      company: "NSN AS",
      location: "Oslo",
      role: "Prosjektleder",
      period: "2016 – 2018",
      description: "Koordinerte leverandører, kunder og distribuerte utviklingsteam (Ukraina, India, Brasil) i teknisk leveranse for en portefølje på 1 200+ kunder.",
      bullets: [
        "Ledet overgangen fra egenutviklet CMS og prosjektstyringsverktøy til WordPress/WooCommerce og Teamwork — reduserte leveransetiden med ca. 20 %.",
        "Fulgte opp ekstern SEO/Adwords-leverandør og distribuerte utviklerteam for å sikre fremdrift og kvalitet i leveransene."
      ]
    },
    {
      id: "exp1",
      company: "BITRUPTION AS",
      location: "Oslo",
      role: "Produktleder (engasjement)",
      period: "2025 – 2026",
      description: "Kortere engasjement: vurderte og konseptualiserte nye produktlinjer for algoritmisk handelsselskap, med behovsavklaring, risikovurdering og beslutningsgrunnlag for ledelsens veivalg.",
      bullets: []
    },
    {
      id: "exp5",
      company: "MOERO AS",
      location: "Oslo",
      role: "Eier og daglig leder",
      period: "2011 – 2016",
      description: "Grunnla og drev digitalt byrå som leverte over 40 nettbutikker og nettsider, med personalansvar for 6 ansatte og koordinering av 14+ eksterne utviklere.",
      bullets: []
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Innovasjon og entreprenørskap",
      school: "NUS Singapore 2009 · masternivå",
      period: "2009",
      details: "(Gründerskolen, UiO)"
    },
    {
      id: "edu2",
      degree: "Innovasjon og entreprenørskap",
      school: "UC Berkeley 2008 (utveksling)",
      period: "2008",
      details: "snitt A"
    },
    {
      id: "edu3",
      degree: "Bachelor, økonomi og administrasjon",
      school: "Handelshøyskolen BI",
      period: "2005 – 2008",
      details: ""
    },
    {
      id: "edu4",
      degree: "Fagbrev i IKT-driftsfag",
      school: "Oslo kommune, Bydel Stovner",
      period: "2001 – 2003",
      details: "IT-drift, support og feilhåndtering, 250 brukere"
    }
  ],
  skills: [
    "APPLIKASJONSFORVALTNING",
    "LEVERANDØROPPFØLGING OG KOORDINERING",
    "ITSM-RELATERT PROSESSARBEID (INCIDENT/PROBLEM/ENDRING)",
    "RISIKOVURDERING OG AVHENGIGHETER",
    "TESTING OG KVALITETSSIKRING",
    "TVERRFAGLIG KOORDINERING",
    "PROSESSFORBEDRING",
    "LOOKER / BIGQUERY / TABLEAU",
    "JIRA / CONFLUENCE / FAVRO",
    "AI-VERKTØY (CLAUDE, LOVABLE, BOLT)"
  ],
  links: [
    { label: "LinkedIn", url: "linkedin.com/in/haugeplass" }
  ],
  languages: [
    { name: "NORSK", level: "Morsmål" },
    { name: "ENGELSK", level: "Flytende" }
  ],
  projects: [
    {
      id: "proj1",
      title: "Betalings- og identitetsløsninger — Vipps Direct, Trustly, Klarna og BankID",
      client: "Foodora Norway",
      description: "Koordinerte lokal utrulling av nye betalings- og innloggingsløsninger — endringer der feil ville rammet betaling og innlogging for over 1 million brukere. Ansvar for avklaringer mellom relevante team, testing, avhengigheter og oppfølging av produksjonssetting."
    },
    {
      id: "proj2",
      title: "App-konsolidering på tvers av 6 land",
      client: "Foodora Norway",
      description: "Koordinerte de lokale endringene da 6 land konsoliderte appen: sikret fremdrift, testet utrulling, fulgte opp feilrapporter, og gjennomførte brukerintervjuer med analyse av resultatene i forbindelse med relanseringen."
    },
    {
      id: "proj3",
      title: "Automatisert KPI-rapportering til ledelsen",
      client: "Foodora Norway",
      description: "Bygget månedlig produktrapportering på BigQuery-data med automatisk oppdatering av diagrammer og presentasjoner — grunnlag for oppfølging av avvik og forbedringstiltak."
    },
    {
      id: "proj4",
      title: "Parklink — fra 50 000 til 600 000 brukere",
      client: "Bember AS",
      description: "Sentral i produktutviklingen gjennom hele vekstreisen — prototyper, brukerhistorier og spesifiserte krav i tett koordinering med utviklingsteamet, og daglig samarbeid med DevOps om drift og tekniske endringer."
    },
    {
      id: "proj5",
      title: "Automatisering av supportprosesser",
      client: "Bember AS",
      description: "Automatiserte interne supportprosesser gjennom systematisk prosessforbedring og struktur — reduserte manuelt arbeid og doblet prosesseffektiviteten."
    },
    {
      id: "proj6",
      title: "Overgang til åpen kildekode og nytt prosjektstyringsverktøy",
      client: "NSN AS",
      description: "Ledet overgangen fra egenutviklet CMS og prosjektstyring til WordPress/WooCommerce og Teamwork for et byrå med over 2 000 bedriftskunder — valgte løsninger, lærte opp ansatte underveis og reduserte leveransetiden med ca. 20 %."
    }
  ]
};
