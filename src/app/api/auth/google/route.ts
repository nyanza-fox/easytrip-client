import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/url';

import type { BaseResponse } from '@/types/response';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const response = await fetch(`${API_URL}/auth/google`, {
    method: 'GET',
    headers: {
      token: body.token,
    },
  });
  const data: BaseResponse<{ token: string; role: 'admin' | 'user' }> = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: data.statusCode });
  }

  cookies().set('loginInfo', JSON.stringify(data.data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: 'strict',
  });

  return NextResponse.json(data, { status: data.statusCode });
};
