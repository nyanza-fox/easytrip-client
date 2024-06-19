import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  cookies().set('loginInfo', JSON.stringify(body), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: 'strict',
  });

  return NextResponse.json({ statusCode: 200, message: 'Logged in successfully' }, { status: 200 });
};
