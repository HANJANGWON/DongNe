import { gql } from "apollo-server-express";

export default gql`
  type LikePostResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleLike(id: Int!): LikePostResult
  }
`;
