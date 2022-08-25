import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Room: {
    users: ({ id }, _, { prisma }) =>
      prisma.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, _, { prisma }) =>
      prisma.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, __, { prisma, loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return prisma.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
};

export default resolvers;
