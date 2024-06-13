import { z } from 'zod';

export const accommodationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  images: z.array(z.string()).nonempty({ message: 'Images is required' }),
  facilities: z.array(z.string()).nonempty({ message: 'Facilities is required' }),
  maxGuests: z.number().int().positive({ message: 'Max Guests must be a positive integer' }),
  pricePerNight: z
    .number()
    .int()
    .positive({ message: 'Price Per Night must be a positive integer' }),
  location: z.object({
    address: z.string().min(1, { message: 'Address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    zipCode: z.string().min(1, { message: 'Zip Code is required' }),
  }),
  contact: z.object({
    email: z.string().email({ message: 'Invalid email' }),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
  }),
});

export const destinationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  images: z.array(z.string()).nonempty({ message: 'Images is required' }),
  attractions: z.array(z.string()).nonempty({ message: 'Attractions is required' }),
  price: z.number().int().positive({ message: 'Price must be a positive integer' }),
  location: z.object({
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    coordinates: z
      .array(z.number().min(-90).max(90), z.number().min(-180).max(180))
      .length(2, { message: 'Latitude and Longitude are required' }),
  }),
});

export const guideSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  languages: z.array(z.string()).nonempty({ message: 'Languages is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
  pricePerDay: z.number().int().positive({ message: 'Price Per Day is required' }),
  contact: z.object({
    email: z.string().email({ message: 'Email is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
  }),
  location: z.object({
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
});

export const transportationSchema = z.object({
  type: z.string().min(1, { message: 'Type is required' }),
  company: z.string().min(1, { message: 'Company is required' }),
  price: z.number().int().positive({ message: 'Price must be a positive integer' }),
  departure: z.object({
    time: z.string().min(1, { message: 'Departure Time is required' }),
    location: z.string().min(1, { message: 'Departure Location is required' }),
  }),
  arrival: z.object({
    time: z.string().min(1, { message: 'Arrival Time is required' }),
    location: z.string().min(1, { message: 'Arrival Location is required' }),
  }),
});
