import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/error.middleware";
import routers from "./routes";
import envVars from "./config/env";

dotenv.config();

const app = express();

app.use(cors({ origin: envVars.clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(routers);
app.use(errorHandler);

export default app;
