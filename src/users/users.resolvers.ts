import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }, _, { prisma }) =>
      prisma.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }, _, { prisma }) =>
      prisma.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};

export default resolvers;
