import { Resolvers } from "src/types";
import { protectResolver } from "../../users/users.utils";
import { CreateCommentInput } from "./createComment.dto";

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectResolver(
      async (
        _,
        { postId, payload }: CreateCommentInput,
        { loggedInUser, prisma }
      ) => {
        const ok = await prisma.post.findUnique({
          where: {
            id: postId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Post not found",
          };
        }
        await prisma.comment.create({
          data: {
            payload,
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
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
