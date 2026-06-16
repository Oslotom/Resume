import { CVData } from './types';

export const cvData: CVData = {
  name: "Tom Haugeplass",
  title: "Delivery Lead | Senior Product Manager | AI & Data-driven Growth",
  contact: {
    phone: "(+47) 472 34 017",
    email: "tomhaugeplass@gmail.com",
    linkedin: "linkedin.com/in/haugeplass",
    location: "Oslo, Norway"
  },
  summary: "Delivery Lead og Senior Product Manager med erfaring fra startups og globale selskaper. Erfaring med å lede tverrfaglige team i utvikling og leveranse av digitale produkter. Skaper klarhet gjennom workshops, tydelige roadmaps og datadrevet prioritering. Sterk på stakeholder management og forretnings forståelse, med erfaring fra hele salgsprosessen. Trives med å utvikle team og få folk til å levere.",
  experience: [
    {
      id: "foodora",
      role: "Senior Product Manager Team Lead",
      company: "Foodora Norway",
      period: "09.2022 - 02.2025",
      description: [
        "Ledet 99930+ lokale produktlanseringer innen UX, betaling, integrasjon og funksjonalitet som økte konvertering og brukeropplevelse betydelig",
        "Fungerte som sparringspartner mot globale organisasjon og lokale team, og innsikt til business case og prioriterte produktinitiativer",
        "Gjennomførte brukerintervjuer og innsiktsarbeid i forbindelse med større app-relansering",
        "Utviklet Looker-dashboards, med datagrunnlag fra BigQuery, for å følge konvertering og støtte datadrevet prioritering",
        "Bidro til selskapets globale AI-satsing gjennom workshops, kunnskapsdeling og testing av løsninger basert på Gemini & ChatGPT"
      ]
    },
    {
      id: "bember",
      role: "Produktleder",
      company: "Bember AS",
      period: "10.2018 - 09.2022",
      description: [
        "Sentral i produktutviklingen av Parklink som vokste fra 50 000 til 600 000 brukere",
        "Sørget for at ledelsens visjoner kunne bli gjennomførbare gjennom prototyper, brukerhistorier og refinert kravspesifikasjon",
        "Automatiserte interne supportprosesser og økte effektiviteten med 20 %"
      ]
    },
    {
      id: "nsn",
      role: "Prosjektleder",
      company: "NSN AS",
      period: "09.2016 - 09.2018",
      description: [
        "Ansvar for salg, prosjektledelse og leveranse av e-handels- og webprosjekter for en kundeportefølje på over 1 200 kunder",
        "Reduserte kostnader og leveringstid ved å innføre prosjektstyringsverktøy og bedre utnyttelse av open source"
      ]
    },
    {
      id: "moero",
      role: "Eier og daglig leder",
      company: "Moero AS",
      period: "02.2011 - 07.2016",
      description: [
        "Grunnla og drev digitalt byrå som utviklet selvbetjente Nettbutikk-plattformer",
        "Ansvar for salg, behovsavklaring og leveranse av 40+ nettbutikker og nettsider",
        "Ledet team på 6 ansatte og 12+ eksterne utviklere"
      ]
    }
  ],
  skills: [
    "Produktledelse", "Prosjektledelse", "Produktstrategi og roadmap", 
    "Discovery og brukerinnsikt", "Dataanalyse", "AI-verktøy og automatisering", 
    "OKR og prioritering", "Kulturbærer"
  ],
  education: [
    {
      degree: "Innovasjon og entreprenørskap (del av master)",
      institution: "National University of Singapore",
      year: "2009"
    },
    {
      degree: "Innovasjon og entreprenørskap (utveksling)",
      institution: "University of California, Berkeley",
      year: "2008"
    },
    {
      degree: "Bachelor i økonomi og administrasjon",
      institution: "Handelshøyskolen BI | Nydalen",
      year: "2005"
    },
    {
      degree: "Fagbrev i IKT Driftsfag",
      institution: "Oslo kommune bydel Stovner",
      year: "2001"
    }
  ]
};
