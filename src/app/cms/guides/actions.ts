'use server';

import { redirect } from 'next/navigation';

import { API_URL } from '@/constants/url';
import { guideSchema } from '@/utils/schema';

export const createGuide = async (formData: FormData) => {
  const validation = guideSchema.safeParse({
    name: formData.get('name'),
    languages: formData
      .get('languages')
      ?.toString()
      .split(',')
      .map((lang) => lang.trim()),
    rating: parseInt(formData.get('rating')?.toString() || '0'),
    image: formData.get('image'),
    pricePerDay: parseInt(formData.get('pricePerDay')?.toString() || '0'),
    location: {
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
    },
    contact: {
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/guides/create?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/guides`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to create guide';
    return redirect(`/cms/guides/create?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/guides');
};

export const updateGuide = async (id: string, formData: FormData) => {
  const validation = guideSchema.safeParse({
    name: formData.get('name'),
    languages: formData
      .get('languages')
      ?.toString()
      .split(',')
      .map((lang) => lang.trim()),
    rating: parseInt(formData.get('rating')?.toString() || '0'),
    image: formData.get('image'),
    pricePerDay: parseInt(formData.get('pricePerDay')?.toString() || '0'),
    location: {
      city: formData.get('city'),
      state: formData.get('state'),
      country: formData.get('country'),
    },
    contact: {
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/guides/update/${id}?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/guides/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to update guide';
    return redirect(`/cms/guides/update/${id}?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/guides');
};
