import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { checkUser } from "./middleware";
import bcrypt from "bcryptjs";
import { decode, sign, verify } from "hono/jwt";
const api = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>().basePath("/api/v1");
export const connectPrisma = (url: string) => {
  return new PrismaClient({
    datasourceUrl: url,
  }).$extends(withAccelerate());
};
api.post("/signup", checkUser, async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const hashedPassword = await bcrypt.hashSync(body.password, 10);
  await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: hashedPassword,
    },
  });
  const token = await sign({ email: body.email }, "secret");
  console.log(token);

  return c.json({
    token: token,
    massage: "signup complete",
  });
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
