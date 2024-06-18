import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/url';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const loginInfo = req.cookies.get('loginInfo');

  const body = await req.json();

  if (!loginInfo) {
    return NextResponse.json(
      { statusCode: 400, message: 'Please login to book a package' },
      { status: 400 }
    );
  }

  const { token } = JSON.parse(loginInfo.value || '');

  const response = await fetch(`${API_URL}/orders/${params.id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return NextResponse.json(data);
};
