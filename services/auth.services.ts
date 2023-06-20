import bcrypt from "bcrypt";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../prisma/client";
import { ILoginPayload, IRegisterUserPayload } from "../types/auth";
import { accessCookie, sendAuthCookies } from "../utils/cookies.util";
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from "../utils/tokens.util";
import APIError from "../utils/apiError.util";

export const create = async ({
  firstName,
  lastName,
  email,
  password,
}: IRegisterUserPayload) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const alreadyExistingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (alreadyExistingUser) {
    throw Error("Email already exists!");
  }

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
};

export const loginHandler = async (
  res: Response,
  { email, password }: ILoginPayload
) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw Error("Invalid credentials");
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    throw Error("Invalid credentials");
  }

  // generate access and refresh token
  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });

  // send cookies
  sendAuthCookies(res, { accessToken, refreshToken });

  const { firstName, lastName, id } = user;

  return { email, firstName, lastName, id };
};

export const refreshTokenHandler = async (
  res: Response,
  refreshToken: string
) => {
  const payload: any = validateRefreshToken(refreshToken);

  if (!payload) {
    throw new APIError(StatusCodes.BAD_REQUEST, "Invalid refresh token");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    throw new APIError(StatusCodes.BAD_REQUEST, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({ userId: user.id });
  accessCookie(res, newAccessToken);

  const { email, firstName, lastName, id } = user;

  return { email, firstName, lastName, id };
};
