import bycrypt from "bcrypt";
import prisma from "../../client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
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
