import http from "http";

import app from "./app";
import envVars from "./config/env";
import { initializeWSServer } from "./wsServer";
import { prisma } from "./prisma/client";

const main = async () => {
  try {
    await prisma.$connect();
    const httpServer = http.createServer(app);
    initializeWSServer(httpServer);
    httpServer.listen(envVars.port, () => {
      console.log(`Server runnign on port ${envVars.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
