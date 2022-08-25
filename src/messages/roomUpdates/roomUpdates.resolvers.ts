import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import prisma from "../../client";

const resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: async (parent, args, context, info) => {
        const room = await prisma.room.findUnique({
          where: {
            id: args.id,
          },
          select: {
            id: true,
          },
        });

        if (!room) {
          throw new Error("You shall not see this.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdates }, { id }) => {
            return roomUpdates.roomId === id;
          }
        )(parent, args, context, info);
      },
    },
  },
};

export default resolvers;
