import jwt from "jsonwebtoken";

import { ITokenPayload } from "../types/tokens";
import envVars from "../config/env";
import { TokenExpiration } from "../types/tokens";

export const generateAccessToken = (payload: ITokenPayload) => {
  return jwt.sign(payload, envVars.accessTokenSecret, {
    expiresIn: TokenExpiration.Access,
  });
};

export const generateRefreshToken = (payload: ITokenPayload) => {
  return jwt.sign(payload, envVars.refreshTokenSecret, {
    expiresIn: TokenExpiration.Refresh,
  });
};

export const validateAccessToken = (token: string) => {
  return jwt.verify(token, envVars.accessTokenSecret);
};

export const validateRefreshToken = (token: string) => {
  return jwt.verify(token, envVars.refreshTokenSecret);
};
