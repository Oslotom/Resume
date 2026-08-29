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
    sidebarBodyFontSize: 8.5,
    headingFontFamily: 'Raleway',
    bodyFontFamily: 'Open Sans',
    lineHeight: 1.5,
    nameToTitleSpacing: 8,
    titleToContactSpacing: 32,
    headerVerticalPadding: 64,
    headerPaddingTop: 64,
    headerContactGap: 24,
    projectsWidth: 320,
    projectsDescriptionWidth: 400,
    pageWidth: 1000
  },
  personal: {
    name: "TOM HAUGEPLASS",
    title: "PRODUKTLEDER · BRUKERINNSIKT · TVERRFAGLIG TEAMLEDELSE",
    subtitle: "OM MEG",
    summary: "Produktleder med solid erfaring i å eie produktverdi på tvers av brukerbehov, teknologi og forretning. Har koordinert og kvalitetssikret 40+ endringer i en global plattform med over 1 million norske brukere — fra risikovurdering og avhengigheter til testing, produksjonssetting og evaluering. Sterk på å bygge tverrfaglige team, skape struktur og prioriteringer, og jobbe datadrevet med både kvalitativ og kvantitativ innsikt. Teknisk fundament fra fagbrev i IKT-driftsfag. Søker nå en produktlederrolle der jeg kan forme tjenester som faktisk gjør hverdagen enklere for folk.",
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
      description: "Hovedansvar for å koordinere og kvalitetssikre lokale endringer i en global plattform med over 1 million norske brukere — med fokus på produktverdi, brukerinnsikt og tverrfaglig leveranse.",
      bullets: [
        "Koordinerte og kvalitetssikret 40+ endringer innen betaling, integrasjoner, UX og funksjonalitet — med ansvar for risikovurdering, avhengigheter, testing og koordinert utrulling i samarbeid med tekniske team.",
        "Sikret testing, kommunikasjon og oppfølging før og etter produksjonssetting; vurderte konsekvenser og bruker-/forretningspåvirkning ved større endringer.",
        "Teamleder med personalansvar — medarbeidersamtaler, utviklingsplaner og rekruttering; representerte produktteamet overfor ledelsen og den globale organisasjonen.",
        "Internt kontaktpunkt for produktrelaterte spørsmål og support; fulgte opp feilrapporter og oversatte tekniske beslutninger for ikke-tekniske interessenter.",
        "Evaluerte gjennomførte endringer og rapporterte produkt- og leveranse-KPI-er månedlig til ledelsen gjennom egenbygde Looker-dashboards på BigQuery-data.",
        "Bidro til selskapets globale AI-satsing gjennom workshops for ansatte, internt pilotprosjekt for Gemini Workspace og strukturert testing av nye løsninger."
      ]
    },
    {
      id: "exp3",
      company: "BEMBER AS",
      location: "Oslo",
      role: "Produktleder",
      period: "2018 – 2022",
      description: "Sentral i produktutviklingen av Parklink, som vokste fra 50 000 til 600 000 brukere; tett daglig samarbeid med DevOps-team om drift, prioritering og oppfølging av tekniske endringer.",
      bullets: [
        "Koordinerte lansering av nye selvbetjente tjenester (avtaleparkering, Trumf-integrasjon, firmakonto) mot sluttbrukere, kunder og partnere.",
        "Identifiserte og automatiserte interne supportprosesser — reduserte manuelt arbeid og doblet prosesseffektiviteten."
      ]
    },
    {
      id: "exp1",
      company: "BITRUPTION AS",
      location: "Oslo",
      role: "Produktleder (engasjement)",
      period: "2025 – 2026",
      description: "Vurderte og konseptualiserte nye produktlinjer for algoritmisk handelsselskap, basert på selskapets handelsdata — blant annet utredning av en mulig handelsplattform, med behovsavklaring, risikovurdering og beslutningsgrunnlag for ledelsens veivalg. Bygget prototyper med AI-verktøy (Claude, Google AI Studio, Lovable, Bolt) i utforskningen.",
      bullets: []
    },
    {
      id: "exp4",
      company: "NSN AS",
      location: "Oslo",
      role: "Prosjektleder",
      period: "2016 – 2018",
      description: "Ledet tekniske web- og e-handelsprosjekter fra behovsavklaring til leveranse for en portefølje på 1 200+ kunder, i samarbeid med distribuerte utviklingsteam (Ukraina, India, Brasil).",
      bullets: [
        "Ledet overgangen til WordPress/WooCommerce og nytt prosjektstyringsverktøy — reduserte leveransetiden med ca. 20 %."
      ]
    },
    {
      id: "exp5",
      company: "MOERO AS",
      location: "Oslo",
      role: "Eier og daglig leder",
      period: "2011 – 2016",
      description: "Grunnla og drev digitalt byrå som leverte over 40 nettbutikker og nettsider — blant de første leverandørene av selvbetjente Magento-nettbutikker, først i Norge med WooCommerce. Rekrutterte og hadde personalansvar for 6 ansatte, og koordinerte 14+ eksterne utviklere.",
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
    "PRODUKTSTRATEGI OG PRIORITERING",
    "BRUKERINNSIKT OG EFFEKT-MÅLING",
    "TVERRFAGLIG TEAMLEDELSE",
    "RISIKOVURDERING OG AVHENGIGHETER",
    "TESTING OG KVALITETSSIKRING",
    "PROSESSFORBEDRING OG SUPPORT",
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
      description: "Koordinerte lokal utrulling av nye betalings- og innloggingsløsninger — endringer der feil ville rammet betaling og innlogging for over 1 million brukere. Ansvar for avklaringer mellom relevante team, testing, avhengigheter og oppfølging av produksjonssetting.",
      bullets: []
    },
    {
      id: "proj2",
      title: "App-konsolidering på tvers av 6 land",
      client: "Foodora Norway",
      description: "Koordinerte de lokale endringene da 6 land konsoliderte appen: sikret fremdrift, testet utrulling, fulgte opp feilrapporter, og gjennomførte brukerintervjuer med analyse av resultatene i forbindelse med relanseringen.",
      bullets: []
    },
    {
      id: "proj3",
      title: "Automatisert KPI-rapportering til ledelsen",
      client: "Foodora Norway",
      description: "Bygget månedlig produktrapportering på BigQuery-data med automatisk oppdatering av diagrammer og presentasjoner — grunnlag for oppfølging av avvik og forbedringstiltak.",
      bullets: []
    },
    {
      id: "proj4",
      title: "Parklink — fra 50 000 til 600 000 brukere",
      client: "Bember AS",
      description: "Sentral i produktutviklingen gjennom hele vekstreisen — prototyper, brukerhistorier og spesifiserte krav i tett koordinering med utviklingsteamet, og daglig samarbeid med DevOps om drift og tekniske endringer.",
      bullets: []
    },
    {
      id: "proj5",
      title: "Automatisering av supportprosesser",
      client: "Bember AS",
      description: "Automatiserte interne supportprosesser gjennom systematisk prosessforbedring og struktur — reduserte manuelt arbeid og doblet prosesseffektiviteten.",
      bullets: []
    },
    {
      id: "proj6",
      title: "Overgang til åpen kildekode og nytt prosjektstyringsverktøy",
      client: "NSN AS",
      description: "Ledet overgangen fra egenutviklet CMS og prosjektstyring til WordPress/WooCommerce og Teamwork for et byrå med over 2 000 bedriftskunder — valgte løsninger, lærte opp ansatte underveis og reduserte leveransetiden med ca. 20 %.",
      bullets: []
    }
  ]
};
