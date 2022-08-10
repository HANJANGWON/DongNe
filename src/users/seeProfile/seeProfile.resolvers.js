import prisma from "../../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      prisma.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
