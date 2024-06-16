import type { Location } from './globals';

export type Transportation = {
  _id: string;
  type: string;
  company: string;
  price: number;
  departure: {
    time: Date;
    place: string;
    location: Location;
  };
  arrival: {
    time: Date;
    place: string;
    location: Location;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type TransportationInput = Omit<Transportation, '_id' | 'createdAt' | 'updatedAt'>;
