import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const api = new Hono<{ Bindings: { DATABASE_URL: string } }>().basePath(
  "/api/v1"
);

api.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  });
  return c.text("signup complete");
});

api.post("/signin", async (c) => {
  return c.text("signin");
});

api.post("/blog", async (c) => {
  return c.text("signup");
});

api.put("/blog", async (c) => {
  return c.text("signup");
});

api.get("/blog:id", async (c) => {
  return c.text("signup");
});

export default api;
