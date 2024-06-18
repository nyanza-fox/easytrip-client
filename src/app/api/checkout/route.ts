import { API_URL } from '@/constants/url';
import { BaseResponse } from '@/types/response';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const loginInfo = req.cookies.get('loginInfo');

  const body = await req.json();

  if (!loginInfo) {
    return NextResponse.json(
      { statusCode: 400, message: 'Please login to book a package' },
      { status: 400 }
    );
  }

  const { token } = JSON.parse(loginInfo.value || '');

  const response = await fetch(`${API_URL}/orders/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data: BaseResponse<string> = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message || 'Failed to create order and payment session', statusCode: 400 },
      {
        status: 400,
      }
    );
  }

  if (data.data) {
    return NextResponse.json({ statusCode: 200, data: data.data }, { status: 200 });
  }

  return NextResponse.json(
    { statusCode: 400, message: 'Failed to create order and payment session' },
    { status: 400 }
  );
};
