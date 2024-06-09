import { authMiddleware, checkUser } from "../middleware";
import { connectPrisma } from "../index";
import { Hono } from "hono";
import z from "zod";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});
const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean(),
});
blogRouter.use("*", authMiddleware);

blogRouter.post("/blog", async (c) => {
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

blogRouter.put("/blog/:id", async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const postId = c.req.param("id");
  console.log(body);

  const checkInput = await updateBlogInput.safeParse(body);
  if (!checkInput.success) return c.json(checkInput);

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

blogRouter.get("/blog/:id", async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);
  const postId = c.req.param("id");
  console.log(postId);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          name: true,
          bio: true,
        },
      },
    },
  });
  if (post !== null) {
    return c.json(post);
  }
  return c.text("post not found");
});

blogRouter.get("/blogs", async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);

  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(posts);
});

export default blogRouter;
