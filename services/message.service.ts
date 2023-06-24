import { prisma } from "../prisma/client";
import { IMessage } from "../types/messages";

// :TODO Add error handling
export const createMessage = async (
  firstName: string,
  lastName: string,
  message: string
) => {
  await prisma.messages.create({
    data: {
      name: `${firstName} ${lastName}`,
      message,
    },
  });
};

// :TODO Add error handling
export const getAllMessages = async () => {
  const messages = await prisma.messages.findMany({
    select: { name: true, message: true, createdAt: true, id: true },
  });

  const formattedMessages = messages.map((message: IMessage) => ({
    id: message.id,
    text: `${message.name}: ${
      message.message
    } (${message.createdAt.toLocaleString()})`,
  }));

  return formattedMessages;
};
