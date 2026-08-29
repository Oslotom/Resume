import { CVData } from './types';
import { initialCVData } from './initialData';

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  data: CVData;
}

const settings = initialCVData.settings;

/** Statsbygg – Tech Lead (Produktteam Eiendomsforvaltning) */
const statsbyggTechLead: CVData = {
  settings,
  personal: {
    name: "TOM HAUGEPLASS",
    title: "TECH LEAD · LØSNINGSARKITEKTUR · INTEGRASJONER",
    subtitle: "OM MEG",
    summary:
      "Erfaren teknisk koordinator og produktleder med solid bakgrunn i komplekse systemlandskap, integrasjoner og leverandøroppfølging. Har hatt operativt ansvar for risikovurdering, avhengigheter, testing og produksjonssetting av 40+ endringer i en global plattform med over 1 million brukere — inkludert betalings- og identitetsintegrasjoner (Vipps, Trustly, Klarna, BankID). Sterk på å ta helhetlige tekniske beslutninger i samspill med produkt og virksomhet, sikre kvalitet og robusthet, og være faglig kontaktpunkt mot leverandører og ikke-tekniske interessenter. Teknisk fundament fra fagbrev i IKT-driftsfag. Søker nå en Tech Lead-rolle der jeg kan sette teknisk retning og realisere robuste, sammenhengende løsninger.",
    contact: {
      location: "Oslo",
      phone: "+47 472 34 017",
      email: "tomhaugeplass@gmail.com",
    },
  },
  experience: [
    {
      id: "exp2",
      company: "FOODORA NORWAY",
      location: "Oslo",
      role: "Senior Product Manager & Team Lead",
      period: "2022 – 2025",
      description:
        "Teknisk og produktansvar for lokale endringer i en global plattform med over 1 million norske brukere — med fokus på integrasjoner, kvalitet, risiko og koordinert leveranse.",
      bullets: [
        "Koordinerte og kvalitetssikret 40+ endringer innen betaling, integrasjoner, UX og funksjonalitet — med ansvar for risikovurdering, avhengigheter, testing og koordinert utrulling i samarbeid med tekniske team og leverandører.",
        "Koordinerte leverandøroppfølging av eksterne betalings- og innloggingsleverandører (Vipps Direct, Trustly, Klarna, BankID) ved nye integrasjoner og endringer — avklaringer, testing og oppfølging av produksjonssetting.",
        "Sikret testing, kommunikasjon og oppfølging før og etter produksjonssetting; vurderte konsekvenser for systemer, brukere og forretning ved større endringer.",
        "Var internt kontaktpunkt for produkt- og teknikkrelaterte spørsmål; oversatte tekniske beslutninger for ikke-tekniske interessenter og fulgte opp feilrapporter.",
        "Teamleder med personalansvar; representerte produktteamet overfor ledelsen og den globale organisasjonen.",
        "Bygget og forvaltet KPI-rapportering på BigQuery-data med Looker — datadrevet oppfølging av leveranser og avvik.",
      ],
    },
    {
      id: "exp3",
      company: "BEMBER AS",
      location: "Oslo",
      role: "Produktleder",
      period: "2018 – 2022",
      description:
        "Produkt- og teknisk koordinering for Parklink (50 000 → 600 000 brukere); tett samarbeid med DevOps om drift, prioritering og tekniske endringer.",
      bullets: [
        "Koordinerte lansering av nye selvbetjente tjenester og leverandørintegrasjoner (avtaleparkering, Trumf, firmakonto) mot sluttbrukere, kunder og partnere.",
        "Identifiserte og automatiserte interne supportprosesser — reduserte manuelt arbeid og doblet prosesseffektiviteten.",
        "Daglig samarbeid med DevOps om drift, prioritering og oppfølging av tekniske endringer i produksjon.",
      ],
    },
    {
      id: "exp1",
      company: "BITRUPTION AS",
      location: "Oslo",
      role: "Produktleder (engasjement)",
      period: "2025 – 2026",
      description:
        "Utredning av nye produktlinjer og mulig handelsplattform for algoritmisk handelsselskap — behovsavklaring, risikovurdering og beslutningsgrunnlag. Prototyper med AI-verktøy (Claude, Google AI Studio, Lovable, Bolt).",
      bullets: [],
    },
    {
      id: "exp4",
      company: "NSN AS",
      location: "Oslo",
      role: "Prosjektleder",
      period: "2016 – 2018",
      description:
        "Ledet tekniske web- og e-handelsprosjekter for 1 200+ kunder i samarbeid med distribuerte utviklingsteam (Ukraina, India, Brasil).",
      bullets: [
        "Ledet overgangen fra egenutviklet CMS til WordPress/WooCommerce og nytt prosjektstyringsverktøy — valgte løsninger, lærte opp ansatte og reduserte leveransetiden med ca. 20 %.",
        "Fulgte opp eksterne leverandører og distribuerte utviklerteam for å sikre fremdrift, kvalitet og tekniske avklaringer.",
      ],
    },
    {
      id: "exp5",
      company: "MOERO AS",
      location: "Oslo",
      role: "Eier og daglig leder",
      period: "2011 – 2016",
      description:
        "Grunnla og drev digitalt byrå med 40+ nettbutikker og nettsider. Personalansvar for 6 ansatte og koordinering av 14+ eksterne utviklere — tekniske valg, leveransekvalitet og kundeoppfølging.",
      bullets: [],
    },
  ],
  education: initialCVData.education,
  skills: [
    "LØSNINGSARKITEKTUR OG TEKNISKE VEIVALG",
    "INTEGRASJONER OG SYSTEMSAMARBEID",
    "LEVERANDØROPPFØLGING",
    "RISIKO OG TEKNISK GJELD",
    "TESTING OG KVALITETSSIKRING",
    "DATA OG RAPPORTERING (BIGQUERY / LOOKER)",
    "TVERRFAGLIG KOORDINERING",
    "JIRA / CONFLUENCE / FAVRO",
    "AI-VERKTØY (CLAUDE, LOVABLE, BOLT)",
  ],
  links: initialCVData.links,
  languages: initialCVData.languages,
  projects: [
    {
      id: "proj1",
      title: "Betalings- og identitetsløsninger — Vipps, Trustly, Klarna, BankID",
      client: "Foodora Norway",
      description:
        "Koordinerte lokal utrulling av nye betalings- og innloggingsintegrasjoner — endringer der feil ville rammet betaling og innlogging for over 1 million brukere. Ansvar for avklaringer mellom team og leverandører, testing, avhengigheter og oppfølging av produksjonssetting.",
      bullets: [],
    },
    {
      id: "proj2",
      title: "App-konsolidering på tvers av 6 land",
      client: "Foodora Norway",
      description:
        "Koordinerte lokale tekniske endringer da 6 land konsoliderte appen: sikret fremdrift, testet utrulling, fulgte opp feilrapporter og analyserte resultater etter relansering.",
      bullets: [],
    },
    {
      id: "proj3",
      title: "Datadrevet KPI-rapportering (BigQuery / Looker)",
      client: "Foodora Norway",
      description:
        "Bygget månedlig produktrapportering på BigQuery-data med automatisk oppdatering — grunnlag for oppfølging av avvik, kvalitet og forbedringstiltak.",
      bullets: [],
    },
    {
      id: "proj4",
      title: "Parklink — vekst og teknisk koordinering",
      client: "Bember AS",
      description:
        "Sentral i produkt- og teknisk koordinering gjennom vekst fra 50 000 til 600 000 brukere — krav, integrasjoner og daglig samarbeid med DevOps om drift og tekniske endringer.",
      bullets: [],
    },
    {
      id: "proj5",
      title: "Overgang til åpen kildekode og nytt styringsverktøy",
      client: "NSN AS",
      description:
        "Ledet overgangen fra egenutviklet CMS til WordPress/WooCommerce og Teamwork for byrå med 2 000+ bedriftskunder — tekniske valg, opplæring og ca. 20 % kortere leveransetid.",
      bullets: [],
    },
  ],
};

/** Forhåndsdefinerte CV-maler som alltid er tilgjengelige i Innstillinger & Layout */
export const predefinedTemplates: CVTemplate[] = [
  {
    id: 'entur-team-automat',
    name: 'Entur – Team Automat',
    description: 'Produktleder med fokus på brukerinnsikt, tverrfaglig teamledelse og produktverdi.',
    data: initialCVData,
  },
  {
    id: 'statsbygg-tech-lead',
    name: 'Statsbygg – Tech Lead',
    description:
      'Tech Lead med fokus på løsningsarkitektur, integrasjoner, leverandøroppfølging og teknisk kvalitet.',
    data: statsbyggTechLead,
  },
];
