import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as zod from "zod";

import APIError from "../utils/apiError.util";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof zod.ZodError) {
    const issuesArray = error.issues.map((issue) => issue.message);
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ msg: issuesArray });
  }

  if (error instanceof APIError) {
    return res.status(error.statusCode).json({ msg: [error.message] });
  }

  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Try again later",
  };

  res.status(defaultError.statusCode).json({ msg: [defaultError.msg] });
};
