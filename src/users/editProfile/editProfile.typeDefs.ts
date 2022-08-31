import { gql } from "apollo-server";

export default gql`
  scalar Upload

  type Mutation {
    editProfile(
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): MutationResponse!
  }
`;
