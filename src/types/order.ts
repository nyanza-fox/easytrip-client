import type { Accommodation } from './accommodation';
import type { Destination } from './destination';
import type { Guide } from './guide';
import type { Transportation } from './transportation';
import type { User } from './user';

export type Order = {
  _id: string;
  userId: string;
  user: User;
  status: 'pending' | 'completed' | 'cancelled';
  itinerary: Itinerary[];
  package: Package;
  createdAt: Date;
  updatedAt: Date;
};

export type Itinerary = {
  date: Date;
  activities: {
    time: string;
    name: string;
  }[];
};

export type Package = {
  type: 'budget' | 'standard' | 'luxury';
  transportations: Transportation[];
  destination: Destination | null;
  accommodation: Accommodation | null;
  guide: Guide | null;
  totalDays: number;
  totalGuests: number;
  totalPrice: number;
};

export type OrderInput = Pick<Order, 'itinerary' | 'package'> & { userId: string };
