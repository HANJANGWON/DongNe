import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers } from "src/types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { prisma }) => {
      // find user with args.username
      const user = await prisma.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "user not found.",
        };
      }
      // check password with args.password
      const passwordOk = await bycrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }

      // issue a token and send it to user
      const token = await jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY as string
      );
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
