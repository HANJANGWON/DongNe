import { Resolvers } from "src/types";
import { SeeFeedInput } from "./seeFeed.dts";

const resolvers: Resolvers = {
  Query: {
    seeFeed: (_, { id }: SeeFeedInput, { prisma }) =>
      prisma.feed.findUnique({
        where: {
          id,
        },
      }),
  },
};

export default resolvers;
