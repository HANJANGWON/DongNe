import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, lastId }, { prisma }) => {
      const ok = await prisma.user.findUnique({
        where: { username },
        select: { id: true },
      });

      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const followers = await prisma.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};

export default resolvers;
