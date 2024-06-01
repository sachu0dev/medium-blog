import { connectPrisma } from ".";
import { Hono } from "hono";

// Middleware to check if the user exists
export const checkUser = async (c, next) => {
  try {
    const prisma = connectPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      await next();
    } else {
      // Finalize the response when the user already exists
      c.res = new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in checkUser middleware:", error);
    c.res = new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
