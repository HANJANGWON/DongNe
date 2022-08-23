import { Resolvers } from "src/types";
import { protectResolver } from "../../users/users.utils";
import { processDongtags } from "../feeds.utils";
import { UploadFeedInput } from "./uploadFeed.dto";

const resolvers: Resolvers = {
  Mutation: {
    uploadFeed: protectResolver(
      async (
        _,
        { file, caption }: UploadFeedInput,
        { loggedInUser, prisma }
      ) => {
        let dongtagObj: any = [];

        dongtagObj = processDongtags(caption);
        return prisma.feed.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file,
            caption,
            ...(dongtagObj.length > 0 && {
              dongtags: {
                connectOrCreate: dongtagObj,
              },
            }),
          },
        });
      }
    ),
  },
};

export default resolvers;
