import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    seePostComments: (_, { id }, { prisma }) =>
      prisma.comment.findMany({
        where: {
          postId: id,
        },

        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};

export default resolvers;
