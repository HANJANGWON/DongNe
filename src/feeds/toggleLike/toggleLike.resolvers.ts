import { Resolvers } from "src/types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectResolver(async (_, { id }, { prisma, loggedInUser }) => {
      const feed = await prisma.feed.findUnique({
        where: {
          id,
        },
      });
      if (!feed) {
        return {
          ok: false,
          error: "Feed not found",
        };
      }
      const likeWhere = {
        feedId_userId: {
          userId: loggedInUser.id,
          feedId: id,
        },
      };
      const like = await prisma.like.findUnique({
        where: likeWhere,
      });
      if (like) {
        await prisma.like.delete({
          where: likeWhere,
        });
      } else {
        await prisma.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            feed: {
              connect: {
                id: feed.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
