import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/url';
import { BaseResponse } from '@/types/response';

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { entity: string; id: string } }
) => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/${params.entity}/${params.id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data: BaseResponse<unknown> = await response.json();

  return NextResponse.json(data, { status: data.statusCode });
};
