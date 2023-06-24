import { Server } from "socket.io";
import http from "http";
import cookie from "cookie";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { validateAccessToken } from "./utils/tokens.util";
import { getUser } from "./services/user.service";
import { createMessage, getAllMessages } from "./services/message.service";
import { IUserIdProp } from "./types/objectTypes";

export function initializeWSServer(httpServer: http.Server) {
  const wss = new Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    IUserIdProp
  >(httpServer, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
    cookie: true,
  });

  // validate access token middleware
  wss.use((socket, next) => {
    if (socket.handshake.headers.cookie) {
      try {
        const cookies = cookie.parse(socket.handshake.headers.cookie);
        const accessToken = cookies.access_token;
        const payload = validateAccessToken(accessToken);
        socket.data.userId = (payload as IUserIdProp).userId;
        next();
      } catch (err) {
        socket.emit("unauthenticated");
      }
    } else {
      socket.emit("unauthenticated");
    }
  });

  // on connection event
  wss.on("connection", async (socket) => {
    if (socket.data.userId !== undefined) {
      const user = await getUser(socket.data.userId);
      const messages = await getAllMessages();

      if (user) {
        socket.emit("user", user);

        socket.emit("sendAllMessages", messages);

        socket.on("disconnect", () => {
          socket.broadcast.emit("userDisconnected", {
            id: crypto.randomUUID(),
            text: `${user.firstName} ${user.lastName} left`,
          });
        });

        socket.broadcast.emit("userJoins", {
          id: crypto.randomUUID(),
          text: `${user.firstName} ${user.lastName} joined`,
        });

        socket.on("sendMessage", async (message: string) => {
          wss.emit("broadcastNewMessage", {
            id: crypto.randomUUID(),
            text: `${user?.firstName} ${user?.lastName}: ${message} (${new Date(
              Date.now()
            ).toLocaleString()})`,
          });

          await createMessage(user?.firstName, user?.lastName, message);
        });
      }
    }
  });
}
