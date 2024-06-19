'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { API_URL } from '@/constants/url';
import { loginSchema, registerSchema } from '@/utils/schema';

import type { BaseResponse } from '@/types/response';

export const register = async (formData: FormData) => {
  const validation = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    profile: {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      image: formData.get('image'),
      dateOfBirth: formData.get('dateOfBirth'),
      phoneNumber: formData.get('phoneNumber'),
    },
  });

  if (!validation.success) {
    const message = validation.error.issues[0].message;
    return redirect(`/auth/sign-up?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });

  if (!response.ok) {
    const data: BaseResponse<unknown> = await response.json();
    const message = data.message || 'Failed to register';
    return redirect(`/auth/sign-up?error=${encodeURIComponent(message)}`);
  }

  redirect('/sign-in');
};

export const login = async (formData: FormData) => {
  const validation = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validation.success) {
    const message = validation.error.issues[0].message;
    return redirect(`/auth/sign-in?error=${encodeURIComponent(message)}`);
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validation.data),
  });
  const data: BaseResponse<{ token: string; role: 'admin' | 'user'; image?: string }> =
    await response.json();

  if (!response.ok) {
    const message = data.message || 'Failed to login';
    return redirect(`/auth/sign-in?error=${encodeURIComponent(message)}`);
  }

  if (data.data) {
    cookies().set('loginInfo', JSON.stringify(data.data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // expires: new Date(Date.now() + 1000 * 60 * 60),
      sameSite: 'strict',
    });

    data.data.role === 'admin' ? redirect('/cms') : redirect('/');
  }
};

export const logout = () => {
  cookies().delete('loginInfo');
  redirect('/auth/sign-in');
};
