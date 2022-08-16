import { Resolvers } from "src/types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectResolver((_, { username }, { prisma }) =>
      prisma.user.findUnique({
        where: {
          username,
        },
      })
    ),
  },
};

export default resolvers;
