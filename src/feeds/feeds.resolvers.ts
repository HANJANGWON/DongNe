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
  Dongtag: {
    feeds: ({ id }, { page }, { prisma, loggedInUser }) => {
      return prisma.dongtag
        .findUnique({
          where: {
            id,
          },
        })
        .feeds({
          take: 5,
          skip: (page - 1) * 5,
        });
    },
    totalFeeds: ({ id }, _, { prisma }) =>
      prisma.feed.count({
        where: {
          dongtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
