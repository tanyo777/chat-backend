import { NextFunction, Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

import APIError from "../utils/apiError.util";
import { validateAccessToken } from "../utils/tokens.util";

export const auth = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      throw new APIError(StatusCodes.UNAUTHORIZED, "Invalid access token");
    }
    try {
      const payload = validateAccessToken(accessToken);
      req.userId = (payload as any).userId;
      next();
    } catch (error) {
      throw new APIError(StatusCodes.UNAUTHORIZED, "Invalid access token");
    }
  }
);
