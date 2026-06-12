export type VehicleKind = 'car' | 'truck';

export type Urgency = 'ok' | 'warn' | 'danger';

export type ServiceType =
  | 'engine_oil'
  | 'gearbox_oil'
  | 'power_steering_oil'
  | 'differential_oil'
  | 'oil_filter'
  | 'air_filter'
  | 'cabin_filter'
  | 'fuel_filter'
  | 'adblue'
  | 'tires'
  | 'maintenance'
  | 'other';

export interface StatItem {
  key: string;
  label: string;
  icon: string; // MaterialCommunityIcons name
  value: string;
  unit?: string;
  progress: number; // 0..1
  fill: 'gold' | 'green' | 'amber' | 'violet';
  target?: string; // optional screen route to open on press
}

export interface Reminder {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  urgency: Urgency;
  value: string;
  unit: string;
  group: 'overdue' | 'week' | 'month' | 'later';
}

export interface ServiceEvent {
  id: string;
  type: ServiceType;
  name: string;
  icon: string;
  date: string;
  mileage: string;
  place: string;
  cost: number;
}

export interface TireSet {
  id: string;
  season: 'winter' | 'summer';
  studType?: 'studded' | 'friction';
  manufacturer: string;
  model: string;
  size: string;
  treadMm: number;
  treadMax: number; // for progress
  distanceKm: number;
  distanceLabel: string;
  active: boolean;
  axle?: string; // truck: which axle this set belongs to
}

export interface Vehicle {
  id: string;
  kind: VehicleKind;
  make: string;
  model: string;
  year: number;
  plate: string;
  engine: string;
  color: string;
  mileage: number;
  health: number; // 0..100
  healthLabel: string;
  badge: { text: string; urgency: Urgency };
  glyphIcon: string; // MaterialCommunityIcons

  // truck-specific
  engineHours?: number;
  adBlueLevel?: number; // 0..1
  axles?: number;
  hasTrailer?: boolean;
  trailerPlate?: string;

  stats: StatItem[];
  reminders: Reminder[];
  history: ServiceEvent[];
  tires: TireSet[];
}
