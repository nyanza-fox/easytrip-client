export type Guide = {
  _id: string;
  name: string;
  languages: string[];
  image: string;
  pricePerDay: number;
  contact: {
    email: string;
    phoneNumber: string;
  };
  location: {
    city: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type GuideInput = Omit<Guide, '_id' | 'createdAt' | 'updatedAt'>;
