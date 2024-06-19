import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/url';

import type { Package } from '@/types/order';
import type { BaseResponse } from '@/types/response';

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const body = await req.json();
  const response = await fetch(`${API_URL}/destinations/${params.id}/packages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data: BaseResponse<Package[]> = await response.json();

  return NextResponse.json(data, { status: data.statusCode });
};
