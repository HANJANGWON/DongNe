import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { Resolver, Resolvers } from "src/types";

const resolverFn: Resolver = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, prisma }
) => {
  let avatarUrl: any = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/src/" + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
  let uglyPassword: any = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "could not update profile.",
    };
  }
};

const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};

export default resolvers;