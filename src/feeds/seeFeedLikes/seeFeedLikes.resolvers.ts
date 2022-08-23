import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    seeFeedLikes: async (_, { id }, { prisma }) => {
      const likes = await prisma.like.findMany({
        where: {
          feedId: id,
        },
        select: {
          user: true,
        },
      });
      return likes.map((like) => like.user);
    },
  },
};

export default resolvers;
