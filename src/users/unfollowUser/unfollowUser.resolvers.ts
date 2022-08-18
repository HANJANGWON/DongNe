import { Resolvers } from "src/types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectResolver(
      async (_, { username }, { loggedInUser, prisma }) => {
        const ok = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow user",
          };
        }
        await prisma.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
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
