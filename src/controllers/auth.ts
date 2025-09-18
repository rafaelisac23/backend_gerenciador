import { RequestHandler, Response } from "express";
import z, { email } from "zod";
import { createNewUser, getUserById, verifyUser } from "../services/user";
import { createToken } from "../services/auth";
import { ExtendedRequest } from "../types/extended-request";

const signinSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const signin: RequestHandler = async (req, res, next) => {
  try {
    const data = signinSchema.parse(req.body);

    const newUser = await createNewUser(data);

    const token = createToken(newUser);

    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

const signUpSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const data = signUpSchema.parse(req.body);

    const user = await verifyUser(data);

    const token = createToken(user);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const validate = async (req: ExtendedRequest, res: Response) => {
  const user = await getUserById(req.user?.id as number);

  res.json({ id: user?.id, email: user?.email, name: user?.name });
};
