'use server';

import { redirect } from 'next/navigation';

import { API_URL } from '@/constants/url';
import { transportationSchema } from '@/utils/schema';

export const createTransportation = async (formData: FormData) => {
  const validation = transportationSchema.safeParse({
    type: formData.get('type'),
    company: formData.get('company'),
    price: parseInt(formData.get('price')?.toString() || '0'),
    departure: {
      time: formData.get('departureTime'),
      location: formData.get('departureLocation'),
    },
    arrival: {
      time: formData.get('arrivalTime'),
      location: formData.get('arrivalLocation'),
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/transportations/create?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/transportations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    type: formData.get('type'),
    company: formData.get('company'),
    price: parseInt(formData.get('price')?.toString() || '0'),
    departure: {
      time: formData.get('departureTime'),
      location: formData.get('departureLocation'),
    },
    arrival: {
      time: formData.get('arrivalTime'),
      location: formData.get('arrivalLocation'),
    },
  });

  if (!validation.success) {
    const message = validation.error.errors[0].message;
    return redirect(`/cms/transportations/update/${id}?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/transportations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
