import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const cookieStore = cookies();

  // Get the token from the cookie
  const token = cookieStore.get("token"); // Adjust this key to match your cookie name.

  if (!token) {
    return new Response(
      JSON.stringify({ error: "No user ID found in cookies" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Verify the token and extract the payload
    const secretKey = process.env.JWT_SECRET; // Ensure this is set in your environment variables
    const decoded = jwt.verify(token.value, secretKey);

    // Return the userId from the decoded token
    return new Response(
      JSON.stringify({ userId: decoded.userId }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return new Response(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
﻿
