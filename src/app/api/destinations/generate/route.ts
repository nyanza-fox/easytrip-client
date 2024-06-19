import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/url';

import type { Destination } from '@/types/destination';
import type { BaseResponse } from '@/types/response';

export const POST = async (req: NextRequest) => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const body = await req.json();
  const response = await fetch(`${API_URL}/destinations/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data: BaseResponse<Destination[]> = await response.json();

  return NextResponse.json(data, { status: data.statusCode });
};
