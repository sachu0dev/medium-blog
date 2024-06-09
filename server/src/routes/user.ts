import { authMiddleware, checkUser } from "../middleware";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { connectPrisma } from "../index";
import { Hono } from "hono";
import z from "zod";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const signUpInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
});

const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
// interface signupUser {
//   email: string;
//   name: string;
//   password: string;
// }
// interface signinUser {
//   email: string;
//   password: string;
// }
// authmiddleware call

// test route
userRouter.get("/test", async (c) => {
  return c.text("test route");
});
// signup route
userRouter.post("/signup", checkUser, async (c) => {
  const prisma = connectPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) return c.json({ massage: "invalid user" });
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
    name: body.name,
  });
});
// sigin route
userRouter.post("/signin", async (c) => {
  try {
    const prisma = connectPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    if (body) {
      const { success } = signInInput.safeParse(body);
      if (!success) return c.json({ massage: "invalid user" });
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      const hashedPassword = await bcrypt.hashSync(body.password, 10);
      if (user) {
        if (user.password !== hashedPassword) {
          const token = await sign({ email: user.email }, "secret");
          console.log(token);

          return c.json({
            token: token,
            massage: "signin complete",
            name: user.name,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return c.text("error");
  }
});
userRouter.put("bio", authMiddleware, async (c) => {
  try {
    const prisma = connectPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const userId = c.get("userId");

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        bio: body.bio,
      },
    });
    return c.json({
      massage: "update complete",
    });
  } catch (error) {
    return c.json(error);
  }
});

export default userRouter;
