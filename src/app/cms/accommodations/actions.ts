'use server';

import { redirect } from 'next/navigation';

import { API_URL } from '@/constants/url';
import { accommodationSchema } from '@/utils/schema';

export const createAccommodation = async (formData: FormData) => {
  const validation = accommodationSchema.safeParse({
    name: formData.get('name'),
    type: formData.get('type'),
    images:
      formData
        .get('images')
        ?.toString()
        .split(',')
        .map((image) => image.trim()) || [],
    facilities:
      formData
        .get('facilites')
        ?.toString()
        .split(',')
        .map((facility) => facility.trim()) || [],
    maxGuests: parseInt(formData.get('maxGuests')?.toString() || '0'),
    pricePerNight: parseInt(formData.get('pricePerNight')?.toString() || '0'),
    location: {
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      zipCode: formData.get('zipCode'),
    },
    contact: {
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/accommodations/create?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/accommodations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to create accommodation';
    return redirect(`/cms/accommodations/create?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/accommodations');
};

export const updateAccommodation = async (id: string, formData: FormData) => {
  const validation = accommodationSchema.safeParse({
    name: formData.get('name'),
    type: formData.get('type'),
    images:
      formData
        .get('images')
        ?.toString()
        .split(',')
        .map((image) => image.trim()) || [],
    facilities:
      formData
        .get('facilites')
        ?.toString()
        .split(',')
        .map((facility) => facility.trim()) || [],
    maxGuests: parseInt(formData.get('maxGuests')?.toString() || '0'),
    pricePerNight: parseInt(formData.get('pricePerNight')?.toString() || '0'),
    location: {
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      zipCode: formData.get('zipCode'),
    },
    contact: {
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/accommodations/update/${id}?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/accommodations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to update accommodation';
    return redirect(`/cms/accommodations/update/${id}?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/accommodations');
};