import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Query: {
    seeDongtag: (_, { dongtag }, { prisma }) =>
      prisma.dongtag.findUnique({
        where: {
          dongtag,
        },
      }),
  },
};

export default resolvers;
