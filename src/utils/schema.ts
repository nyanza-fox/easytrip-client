import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  profile: z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().optional(),
    image: z.string().url({ message: 'Invalid image URL' }).optional(),
    dateOfBirth: z.date().max(new Date(), { message: 'Invalid date of birth' }).optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]+$/, { message: 'Invalid phone number' })
      .min(10, { message: 'Phone number must be at least 10 characters' })
      .max(13, { message: 'Phone number must be at most 13 characters' })
      .optional(),
  }),
});

export const accommodationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be between 1 and 5' })
    .max(5, { message: 'Rating must be between 1 and 5' }),
  images: z
    .array(z.string().url({ message: 'Invalid image URL' }))
    .nonempty({ message: 'Images is required' }),
  facilities: z.array(z.string()).nonempty({ message: 'Facilities is required' }),
  maxGuests: z.number().int().positive({ message: 'Max guests must be a positive integer' }),
  pricePerNight: z
    .number()
    .int()
    .positive({ message: 'Price per night must be a positive integer' }),
  location: z.object({
    address: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    zipCode: z
      .string()
      .regex(/^\+?[0-9]+$/, { message: 'Invalid zip code' })
      .optional(),
  }),
  contact: z.object({
    email: z.string().email({ message: 'Invalid email' }).optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]+$/, { message: 'Invalid phone number' })
      .min(10, { message: 'Phone number must be at least 10 characters' })
      .max(13, { message: 'Phone number must be at most 13 characters' })
      .optional(),
  }),
});

export const destinationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  images: z
    .array(z.string().url({ message: 'Invalid image URL' }))
    .nonempty({ message: 'Images is required' }),
  attractions: z.array(z.string()).nonempty({ message: 'Attractions is required' }),
  price: z.number().int().positive({ message: 'Price must be a positive integer' }),
  location: z.object({
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    coordinates: z
      .array(z.number().min(-90).max(90), z.number().min(-180).max(180))
      .length(2, { message: 'Latitude and longitude are required' }),
  }),
});

export const guideSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  languages: z.array(z.string()).nonempty({ message: 'Languages is required' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be between 1 and 5' })
    .max(5, { message: 'Rating must be between 1 and 5' }),
  image: z.string().url({ message: 'Invalid image URL' }).min(1, { message: 'Image is required' }),
  pricePerDay: z.number().int().positive({ message: 'Price per day is required' }),
  location: z.object({
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
  contact: z.object({
    email: z.string().email({ message: 'Email is required' }).optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]+$/, { message: 'Invalid phone number' })
      .min(10, { message: 'Phone number must be at least 10 characters' })
      .max(13, { message: 'Phone number must be at most 13 characters' })
      .optional(),
  }),
});

export const transportationSchema = z.object({
  type: z.string().min(1, { message: 'Type is required' }),
  company: z.string().min(1, { message: 'Company is required' }),
  price: z.number().int().positive({ message: 'Price must be a positive integer' }),
  departure: z.object({
    time: z.string().min(1, { message: 'Departure time is required' }),
    place: z.string().min(1, { message: 'Departure place is required' }),
    location: z.object({
      city: z.string().min(1, { message: 'Departure city is required' }),
      state: z.string().min(1, { message: 'Departure state is required' }),
      country: z.string().min(1, { message: 'Departure country is required' }),
    }),
  }),
  arrival: z.object({
    time: z.string().min(1, { message: 'Arrival time is required' }),
    place: z.string().min(1, { message: 'Arrival place is required' }),
    location: z.object({
      city: z.string().min(1, { message: 'Arrival city is required' }),
      state: z.string().min(1, { message: 'Arrival state is required' }),
      country: z.string().min(1, { message: 'Arrival country is required' }),
    }),
  }),
});
