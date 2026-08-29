import { CVData } from './types';
import { initialCVData } from './initialData';

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  data: CVData;
}

/** Forhåndsdefinerte CV-maler som alltid er tilgjengelige i Innstillinger & Layout */
export const predefinedTemplates: CVTemplate[] = [
  {
    id: 'entur-team-automat',
    name: 'Entur – Team Automat',
    description: 'Produktleder med fokus på brukerinnsikt, tverrfaglig teamledelse og produktverdi.',
    data: initialCVData, // current initialData is the Entur variant
  },
];
