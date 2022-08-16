import { Resolvers } from "src/types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(
      async (_, { username }, { loggedInUser, prisma }) => {
        const ok = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "That user does not exist",
          };
        }
        await prisma.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
