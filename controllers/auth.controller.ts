import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { loginSchema, registrationSchema } from "../utils/validation.util";
import {
  create,
  loginHandler,
  refreshTokenHandler,
} from "../services/auth.services";
import { clearCookies } from "../utils/cookies.util";

export const register = async (req: Request, res: Response) => {
  registrationSchema.parse(req.body);

  const { firstName, lastName, email, password } = req.body;

  await create({ firstName, lastName, email, password });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "You have registered successuly" });
};

export const login = async (req: Request, res: Response) => {
  loginSchema.parse(req.body);

  const user = await loginHandler(res, req.body);

  res.status(StatusCodes.OK).json({ data: user });
};

export const logout = async (req: Request, res: Response) => {
  clearCookies(res);

  res.status(StatusCodes.OK).json({ msg: "Successfuly logged out" });
};

export const refresh = async (req: Request, res: Response) => {
  const refreshCookie = req.cookies;

  const refreshToken = refreshCookie.refresh_token;
  const user = await refreshTokenHandler(res, refreshToken);

  res.status(StatusCodes.OK).json({ data: user });
};
