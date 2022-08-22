import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    searchFeeds: (_, { keyword }, { prisma }) =>
      prisma.feed.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
      }),
  },
};

export default resolvers;
