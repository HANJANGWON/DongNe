import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    searchPosts: (_, { keyword }, { prisma }) =>
      prisma.post.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
      }),
  },
};

export default resolvers;
