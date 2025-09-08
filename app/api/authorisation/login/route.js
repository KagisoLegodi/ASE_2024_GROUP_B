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

    // ✅ Generate a single JWT token
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secretKey,
      { expiresIn: "1h" }
    );

    // ✅ Define cookie options
    const cookieOptions = [
      `HttpOnly`, // prevent access from JS
      `Secure=${process.env.NODE_ENV === "production"}`, // HTTPS only in prod
      `Max-Age=3600`, // 1 hour
      `SameSite=Strict`,
      `Path=/`
    ].join("; ");

    // ✅ Set cookies properly
    const setCookieHeader = [
      `token=${token}; ${cookieOptions}`,
      `user_email=${encodeURIComponent(user.email)}; Path=/; Max-Age=3600; SameSite=Strict`,
      `logged_in=yes; Path=/; Max-Age=3600; SameSite=Strict`
    ];

    // ✅ Respond with cookies and user info
    return new Response(
      JSON.stringify({
        message: "Login successful",
        userId: user._id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": setCookieHeader,
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