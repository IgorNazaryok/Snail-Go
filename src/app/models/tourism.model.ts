export interface TourismSection {
  id: string;
  title: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
  icon: string;
}

export interface TourismCategory {
  title: string;
  items: string[];
  icon: string;
}
