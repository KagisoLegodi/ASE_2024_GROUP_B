import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

/**
 * Middleware to handle JWT token verification using jose.
 */
export async function middleware(req) {
  // Retrieve the token from cookies
  const token = req.cookies.get("token");

  if (!token) {
    // Redirect to login and include the original requested path as a query parameter
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);

    req.user = payload; // Attach user data to the request object
    // Proceed with the request
    return NextResponse.next();
  } catch (error) {
    // Redirect to login for invalid token
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
}

// Apply the middleware only to specific routes
export const config = {
  matcher: ["/recipe"], // Add routes requiring authentication
};
