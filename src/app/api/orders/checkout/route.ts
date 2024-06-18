import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/url';

import type { BaseResponse } from '@/types/response';

export const POST = async (req: NextRequest) => {
  const loginInfo = req.cookies.get('loginInfo');

  if (!loginInfo || !loginInfo.value.length) {
    return NextResponse.json(
      { statusCode: 401, error: 'Unauthorized', message: 'Please login to book a package' },
      { status: 400 }
    );
  }

  const { token } = JSON.parse(loginInfo.value);

  const body = await req.json();
  const response = await fetch(`${API_URL}/orders/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data: BaseResponse<string> = await response.json();

  return NextResponse.json(data, { status: data.statusCode });
};
