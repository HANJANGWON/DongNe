import { Resolvers } from "src/types";
import { protectResolver } from "../../users/users.utils";
import { processDongtags } from "../posts.utils";
import { UploadPostInput } from "./uploadPost.dto";

const resolvers: Resolvers = {
  Mutation: {
    uploadPost: protectResolver(
      async (
        _,
        { file, caption }: UploadPostInput,
        { loggedInUser, prisma }
      ) => {
        let dongtagObj: any = [];

        dongtagObj = processDongtags(caption);
        return prisma.post.create({
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
