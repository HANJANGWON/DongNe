import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    seePostComments: (_, { id, lastId }, { prisma }) => {
      const comments = prisma.comment.findMany({
        where: {
          postId: id,
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "asc",
        },
      });
      return comments;
    },
  },
};

export default resolvers;
