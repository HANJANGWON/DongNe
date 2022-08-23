import { Resolvers } from "src/types";
import { protectResolver } from "../../users/users.utils";
import { processDongtags } from "../feeds.utils";
import { EditFeedInput } from "./editFeed.dto";

const resolvers: Resolvers = {
  Mutation: {
    editFeed: protectResolver(
      async (_, { id, caption }: EditFeedInput, { loggedInUser, prisma }) => {
        const oldFeed = await prisma.feed.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            dongtags: {
              select: {
                dongtag: true,
              },
            },
          },
        });
        if (!oldFeed) {
          return {
            ok: false,
            error: "Feed not found.",
          };
        }
        await prisma.feed.update({
          where: {
            id,
          },
          data: {
            caption,
            dongtags: {
              disconnect: oldFeed.dongtags,
              connectOrCreate: processDongtags(caption),
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
