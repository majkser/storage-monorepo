import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { User } from './app/types/userInterface';

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('connect.sid');

  // check if user is trying to access dashboard is authenticated
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/validate-session`,
        {
          headers: {
            Cookie: `connect.sid=${authCookie.value}`,
          },
          credentials: 'include',
        }
      );

      if (response.status !== 200) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error validating user session:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check admin permissions with separate try-catch
    if (
      request.nextUrl.pathname.startsWith('/dashboard/admin') ||
      request.nextUrl.pathname.startsWith('/dashboard/file-access') ||
      request.nextUrl.pathname.startsWith('/dashboard/revoke-file-access')
    ) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`,
          {
            headers: {
              Cookie: `connect.sid=${authCookie.value}`,
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          return NextResponse.redirect(new URL('/login', request.url));
        }

        const userData: User = await response.json();

        if (userData.isAdmin) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch (error) {
        console.error('Error fetching user data for admin check:', error);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/file-access/:path*'],
};
