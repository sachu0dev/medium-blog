import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { checkUser } from "../middleware";
import bcrypt from "bcryptjs";
import { decode, sign, verify } from "hono/jwt";
import api, { connectPrisma } from "../index";
import { Hono } from "hono";
import { signInInput, signUpInput } from "@sushilkashyap/medium-common";
import { Suspense } from "hono/jsx";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
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
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return c.text("error");
  }
});

export default userRouter;
