export type Transportation = {
  _id: string;
  type: string;
  company: string;
  price: number;
  departure: {
    time: Date;
    location: string;
  };
  arrival: {
    time: Date;
    location: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type TransportationInput = Omit<Transportation, '_id' | 'createdAt' | 'updatedAt'>;
