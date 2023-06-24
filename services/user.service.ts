import { prisma } from "../prisma/client";

// :TODO Add error handling
export const getUser = async (userId: string) => {
  return await prisma.users.findFirst({
    where: {
      id: userId,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      id: true,
    },
  });
};
