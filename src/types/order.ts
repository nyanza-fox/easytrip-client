export type Order = {
  _id: string;
  userId: string;
  destinationId: string;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  itinerary: {
    date: Date;
    activities: string[];
  }[];
  transportations: {
    transportationId: string;
    quantity: number;
    price: number;
  }[];
  accommodations: {
    accommodationId: string;
    checkIn: Date;
    checkOut: Date;
    price: number;
  }[];
  guides: {
    guideId: string;
    date: Date;
    price: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrderInput = Omit<Order, '_id' | 'createdAt' | 'updatedAt'>;
