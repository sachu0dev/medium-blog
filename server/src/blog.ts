import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware, checkUser } from "./middleware";
import bcrypt from "bcryptjs";
import { decode, sign, verify } from "hono/jwt";
import api, { connectPrisma } from "./index";
import { Hono } from "hono";
import { connect } from "cloudflare:sockets";
import { connectPrisma } from ".";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use("*", authMiddleware);

blogRouter.post("/post", async (c) => {
  const primsa = await connectPrisma(c.env.DATABASE_URL);

  const userId = c.get("userId");

  const body = await c.req.json();
  const post = await primsa.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

export default blogRouter;
