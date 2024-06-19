'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { API_URL } from '@/constants/url';
import { destinationSchema } from '@/utils/schema';

export const createDestination = async (formData: FormData) => {
  const validation = destinationSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    images: formData.get('images')
      ? formData
          .get('images')
          ?.toString()
          .split(',')
          .map((image) => image.trim())
      : [],
    attractions: formData.get('attractions')
      ? formData
          .get('attractions')
          ?.toString()
          .split(',')
          .map((attraction) => attraction.trim())
      : [],
    price: parseInt(formData.get('price')?.toString() || '0'),
    location: {
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      coordinates:
        formData.get('latitude') && formData.get('longitude')
          ? [
              parseFloat(formData.get('latitude')?.toString() || '0'),
              parseFloat(formData.get('longitude')?.toString() || '0'),
            ]
          : [],
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/destinations/create?error=${encodeURIComponent(message)}`);
  }

  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/destinations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to create destination';
    return redirect(`/cms/destinations/create?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/destinations');
};

export const updateDestination = async (id: string, formData: FormData) => {
  const validation = destinationSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    images: formData.get('images')
      ? formData
          .get('images')
          ?.toString()
          .split(',')
          .map((image) => image.trim())
      : [],
    attractions: formData.get('attractions')
      ? formData
          .get('attractions')
          ?.toString()
          .split(',')
          .map((attraction) => attraction.trim())
      : [],
    price: parseInt(formData.get('price')?.toString() || '0'),
    location: {
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
      coordinates:
        formData.get('latitude') && formData.get('longitude')
          ? [
              parseFloat(formData.get('latitude')?.toString() || '0'),
              parseFloat(formData.get('longitude')?.toString() || '0'),
            ]
          : [],
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/destinations/update/${id}?error=${encodeURIComponent(message)}`);
  }

  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/destinations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to update destination';
    return redirect(`/cms/destinations/update/${id}?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/destinations');
};
