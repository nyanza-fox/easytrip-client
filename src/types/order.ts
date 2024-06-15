export type Order = {
  _id: string;
  userId: string;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  itinerary: Itinerary[];
  destination: {
    destinationId: string;
    price: number;
  };
  transportations: {
    transportationId: string;
    quantity: number;
    price: number;
  }[];
  accommodation: {
    accommodationId: string;
    checkIn: Date;
    checkOut: Date;
    price: number;
  };
  guide: {
    guideId: string;
    date: Date;
    price: number;
  };
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
  type: 'affordable' | 'standard' | 'luxury';
  destinationId: string;
  transportationsId: string[];
  accommodationId: string;
  guideId: string;
};

export type OrderInput = Omit<Order, '_id' | 'status' | 'createdAt' | 'updatedAt'>;
