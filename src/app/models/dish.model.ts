export interface Dish {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  servingStyle?: string;
  tastingNotes?: string[];
}
