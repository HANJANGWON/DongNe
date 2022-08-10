import bycrypt from "bcrypt";
import prisma from "../../../client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
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
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
