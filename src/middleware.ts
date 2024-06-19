import { NextResponse, NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const loginInfo = req.cookies.get('loginInfo');

  if (!loginInfo || !loginInfo.value.length) {
    if (
      req.nextUrl.pathname.startsWith('/cms') ||
      req.nextUrl.pathname.startsWith('/profile') ||
      req.nextUrl.pathname.startsWith('/orders') ||
      req.nextUrl.pathname.startsWith('/destinations/generate')
    ) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  const { role } = JSON.parse(loginInfo.value);

  if (req.nextUrl.pathname.startsWith('/auth')) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/cms', req.nextUrl.origin));
    } else {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
  }

  if (req.nextUrl.pathname.startsWith('/cms')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|icons).*)'],
};
