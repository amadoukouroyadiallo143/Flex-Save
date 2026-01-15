import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/admin'];
// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for auth token in cookies or localStorage isn't possible in middleware
    // We'll use a simpler approach with cookies
    const token = request.cookies.get('auth-token')?.value;

    // Check if accessing protected route without token
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if logged in and trying to access auth pages
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Admin routes check
    if (pathname.startsWith('/admin')) {
        // In a real app, you'd verify the token and check the role
        // For now, we just check if token exists
        const isAdmin = request.cookies.get('is-admin')?.value === 'true';
        if (!isAdmin && token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/login',
        '/register',
        '/forgot-password',
    ],
};
