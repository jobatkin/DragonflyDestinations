import { NextRequest, NextResponse } from 'next/server'
import CookieHelper from './utils/CookieHelper'
 
// specify protected routes - everything else is public
const protectedRoutes = ['/dashboard', '/profile']
 
export default async function middleware(req: NextRequest) {
    // check if the current route is protected 
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
  
    const isAuthenticated = CookieHelper.isAuthenticated();

    // redirect to /connect if the user is not logged in or authenticated
    if (isProtectedRoute && !isAuthenticated) {
        console.log('user not authenticated, redirecting')
        return NextResponse.redirect(new URL('/connect', req.nextUrl))
    }
  
    return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}