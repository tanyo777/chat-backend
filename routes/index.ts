import { Router } from "express";
import authRouter from "./auth";

const routers = Router();

routers.use(authRouter);

export default routers;
