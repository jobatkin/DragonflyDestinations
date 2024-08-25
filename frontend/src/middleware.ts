import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
// specify protected routes - everything else is public
const protectedRoutes = ['/dashboard', '/profile']
 
export default async function middleware(req: NextRequest) {
  // check if the current route is protected 
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
 
  // extract the user from the cookie
  const cookieUserString = cookies().get('user')?.value
  const authUser = cookieUserString && JSON.parse(cookieUserString).token

  // redirect to /connect if the user is not logged in or authenticated
  if (isProtectedRoute && !authUser) {
    console.log('user not authenticated, redirecting')
    return NextResponse.redirect(new URL('/connect', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}