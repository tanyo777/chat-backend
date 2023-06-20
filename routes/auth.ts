import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";

import {
  login,
  logout,
  register,
  refresh,
} from "../controllers/auth.controller";
import { auth } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/register", asyncHandler(register));
authRouter.post("/login", asyncHandler(login));
authRouter.get("/logout", auth, asyncHandler(logout));
authRouter.get("/refresh", asyncHandler(refresh));

export default authRouter;
