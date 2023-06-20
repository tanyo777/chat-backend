import { Response } from "express";

import { ITokens, TokenExpiration } from "../types/tokens";
import envVars from "../config/env";

export const sendAuthCookies = (res: Response, tokens: ITokens) => {
  const accessTokenExpiration = 1000 * TokenExpiration.Access;
  const refreshTokenExpiration = 1000 * TokenExpiration.Refresh;

  res.cookie("access_token", tokens.accessToken, {
    httpOnly: false,
    expires: new Date(Date.now() + accessTokenExpiration),
    secure: envVars.nodeEnv === "production",
  });

  res.cookie("refresh_token", tokens.refreshToken, {
    httpOnly: false,
    expires: new Date(Date.now() + refreshTokenExpiration),
    secure: envVars.nodeEnv === "production",
  });
};

export const accessCookie = (res: Response, accessToken: string) => {
  const accessTokenExpiration = 1000 * TokenExpiration.Access;

  res.cookie("access_token", accessToken, {
    httpOnly: false,
    expires: new Date(Date.now() + accessTokenExpiration),
    secure: envVars.nodeEnv === "production",
  });
};

export const clearCookies = (res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
};
