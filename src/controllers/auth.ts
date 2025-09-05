import { RequestHandler, Response } from "express";
import z from "zod";
import { createNewUser, verifyUser } from "../services/user";
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

export const validate = (req: ExtendedRequest, res: Response) => {
  res.json({ user: req.user });
};
