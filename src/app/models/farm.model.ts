export interface Farm {
  id: string;
  name: string;
  status: 'Діюча ферма' | 'Проєкт';
  shortDescription: string;
  fullDescription: string;
  location: string;
  address?: string;
  species: string;
  foundedYear?: number;
  scale: string;
  microclimate: string[];
  activities: string[];
  audiences: string[];
  conditions: string[];
  facts: string[];
  cycleStages: string[];
  image: string;
  imageAlt: string;
  badge: string;
}
