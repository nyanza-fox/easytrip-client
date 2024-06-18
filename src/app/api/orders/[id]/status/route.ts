import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/url';

import type { Order } from '@/types/order';
import type { BaseResponse } from '@/types/response';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const loginInfo = req.cookies.get('loginInfo');

  if (!loginInfo || !loginInfo.value.length) {
    return NextResponse.json(
      {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Please login to update the order status',
      },
      { status: 400 }
    );
  }

  const { token } = JSON.parse(loginInfo.value);

  const body = await req.json();
  const response = await fetch(`${API_URL}/orders/${params.id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data: BaseResponse<Order> = await response.json();

  return NextResponse.json(data, { status: data.statusCode });
};
