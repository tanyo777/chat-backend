import { Server } from "socket.io";
import http from "http";
import cookie from "cookie";
import { validateAccessToken } from "./utils/tokens.util";

export function initializeWSServer(httpServer: http.Server) {
  const wss = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
    cookie: true,
  });

  // validate access token middleware
  wss.use((socket, next) => {
    if (socket.handshake.headers.cookie) {
      try {
        const cookies = cookie.parse(socket.handshake.headers.cookie);
        const accessToken = cookies.access_token;
        validateAccessToken(accessToken);
        next();
      } catch (err) {
        socket.emit("unauthenticated");
      }
    } else {
      socket.emit("unauthenticated");
    }
  });

  // on connection event
  wss.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });

    socket.on("messageFromClient", (data) => console.log(data));

    socket.emit("messageFromServer", { message: "Hello from server" });

    socket.on("message", (message: string) => {
      socket.broadcast.emit("message", message);
    });
  });
}
