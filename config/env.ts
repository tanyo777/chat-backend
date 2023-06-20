import dotenv from "dotenv";

import { IEnvVars } from "../types/config";

dotenv.config();

const envVars: IEnvVars = {
  port: process.env.PORT || 7000,
  dbUrl: process.env.DATABASE_URL as string,
  nodeEnv: process.env.NODE_ENV as string,
  clientUrl: process.env.CLIENT_URL as string,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
};

export default envVars;
