// eslint-disable-next-line import/namespace
import type { NextRequest} from "next/server";
// eslint-disable-next-line import/no-unresolved
import { NextResponse } from "next/server";

// eslint-disable-next-line import/no-unresolved
import { cookies } from "next/headers";


// eslint-disable-next-line import/no-unresolved
import { jwtDecode } from 'jwt-decode'

// eslint-disable-next-line import/no-unresolved
import generalResponse from './libs/generalResponse'
// eslint-disable-next-line import/no-unresolved
import verifyToken from './libs/verifyToken'


export async function middleware(req: NextRequest) {
  const tokenByCookie = `Bearer ${cookies().get('token')?.value}`
  const token = req.headers.get('authorization') || tokenByCookie
  const { pathname } = req.nextUrl
  const paths = pathname.split('/') || []
  const splittedToken = token?.split(' ') || []

  if (!splittedToken[0]?.toLowerCase()?.includes('bearer') || !splittedToken[1]) {
    if (paths[1] === 'api') {
      return generalResponse(401, false, 'Unauthorized')
    } else {
      const decoded= jwtDecode(splittedToken[1])
    
      if (decoded.email != undefined && paths.some(path => path.includes('admin'))) {
        return Response.redirect(`${req.nextUrl.origin}/not-found`)
      }

      return Response.redirect(`${req.nextUrl.origin}/login`)
    }
  }

  const isValidToken = await verifyToken(splittedToken[1], process.env.JWT_SECRET_KEY || "TEST" as string)

  if (!isValidToken) {
    if (paths[1] == 'api' || paths.includes('api')) {
      return generalResponse(401, false, token)
    } else {
      return Response.redirect(`${req.nextUrl.origin}/login`)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login|finished|admin/login|forgot-password).*)"],
};
