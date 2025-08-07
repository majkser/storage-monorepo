import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('connect.sid');

  if (
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/file-access')
  ) {
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/validate-session`,
        {
          headers: {
            Cookie: `connect.sid=${authCookie.value}`,
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/file-access/:path*'],
};
