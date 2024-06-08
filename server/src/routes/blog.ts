import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware, checkUser } from "../middleware";
import bcrypt from "bcryptjs";
import { decode, sign, verify } from "hono/jwt";
import api, { connectPrisma } from "../index";
import { Hono } from "hono";
import { connect } from "cloudflare:sockets";
import { connectPrisma } from "..";
import { createBlogInput, updateBlogInput } from "@sushilkashyap/medium-common";

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
  const { success } = createBlogInput.safeParse(body);
  if (!success) return c.json({ massage: "invalid Inputs" });
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

blogRouter.put("/post/:id", async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const postId = c.req.param("id");
  const { success } = updateBlogInput.safeParse(body);
  if (!success) return c.text("invalid input");

  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.get("/post/:id", async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);
  const postId = c.req.param("id");
  console.log(postId);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (post !== null) {
    return c.json(post);
  }
  return c.text("post not found");
});

blogRouter.get("/bulk", async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);

  const posts = await prisma.post.findMany();
  return c.json(posts);
});

export default blogRouter;
