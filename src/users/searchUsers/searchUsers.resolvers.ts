import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { prisma }) =>
      await prisma.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};

export default resolvers;
