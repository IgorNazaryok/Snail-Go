export interface RouteStep {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  order: number;
  timeLabel?: string;
  icon?: string;
}
