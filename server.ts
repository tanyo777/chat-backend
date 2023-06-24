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
      console.log(`HTTP/WS Server running on port ${envVars.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
