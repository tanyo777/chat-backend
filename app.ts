import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(errorHandler);

export default app;
