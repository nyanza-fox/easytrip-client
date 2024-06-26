'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { API_URL } from '@/constants/url';
import { transportationSchema } from '@/utils/schema';

export const createTransportation = async (formData: FormData) => {
  const validation = transportationSchema.safeParse({
    company: formData.get('company'),
    type: formData.get('type'),
    price: parseInt(formData.get('price')?.toString() || '0'),
    departure: {
      time: formData.get('departureTime'),
      place: formData.get('departurePlace'),
      location: {
        city: formData.get('departureCity'),
        state: formData.get('departureState'),
        country: formData.get('departureCountry'),
      },
    },
    arrival: {
      time: formData.get('arrivalTime'),
      place: formData.get('arrivalPlace'),
      location: {
        city: formData.get('arrivalCity'),
        state: formData.get('arrivalState'),
        country: formData.get('arrivalCountry'),
      },
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/transportations/create?error=${encodeURIComponent(message)}`);
  }

  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/transportations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to create transportation';
    return redirect(`/cms/transportations/create?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/transportations');
};

export const updateTransportation = async (id: string, formData: FormData) => {
  const validation = transportationSchema.safeParse({
    company: formData.get('company'),
    type: formData.get('type'),
    price: parseInt(formData.get('price')?.toString() || '0'),
    departure: {
      time: formData.get('departureTime'),
      place: formData.get('departurePlace'),
      location: {
        city: formData.get('departureCity'),
        state: formData.get('departureState'),
        country: formData.get('departureCountry'),
      },
    },
    arrival: {
      time: formData.get('arrivalTime'),
      place: formData.get('arrivalPlace'),
      location: {
        city: formData.get('arrivalCity'),
        state: formData.get('arrivalState'),
        country: formData.get('arrivalCountry'),
      },
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/transportations/update/${id}?error=${encodeURIComponent(message)}`);
  }

  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/transportations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data = await response.json();
    const message = data.message || 'Failed to update transportation';
    return redirect(`/cms/transportations/update/${id}?error=${encodeURIComponent(message)}`);
  }

  redirect('/cms/transportations');
};
