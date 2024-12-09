import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = await clientPromise;
    const db = client.db("devdb");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate a JWT token
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Define cookie options
    const cookieOptions = {
    httpOnly: true,  // Prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Only use cookies over HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "Strict", // Helps prevent CSRF attacks
      path: "/", // Cookie is accessible throughout the entire app
    };

    // Set additional cookies for user state
    const userCookies = [
      `user_email=${encodeURIComponent(user.email)}; Path=/; Max-Age=3600; Secure=${process.env.NODE_ENV === "production"}; SameSite=Strict`,
      `logged_in=yes; Path=/; Max-Age=3600; Secure=${process.env.NODE_ENV === "production"}; SameSite=Strict`,
      `user_session=${token}; Path=/; Max-Age=3600; Secure=${process.env.NODE_ENV === "production"}; SameSite=Strict; HttpOnly`,
    ];

    // Set all cookies in headers
    const setCookieHeader = [`token=${token}; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ")}`, ...userCookies];

    // Respond with user details and cookies
    return new Response(
      JSON.stringify({
        message: "Login successful",
        userId: user._id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieOptions,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}