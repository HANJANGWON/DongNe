import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Feed: {
    user: ({ userId }, _, { prisma }) =>
      prisma.user.findUnique({ where: { id: userId } }),
    dongtags: ({ id }, _, { prisma }) =>
      prisma.dongtag.findMany({
        where: {
          feeds: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
