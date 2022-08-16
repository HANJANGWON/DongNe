import bycrypt from "bcrypt";
import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { prisma }
    ) => {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username or password is already taken.");
        }
        const uglyPassword = await bycrypt.hash(password, 10);
        return prisma.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};

export default resolvers;
