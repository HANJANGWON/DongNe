import { gql } from "apollo-server-express";

export default gql`
  type LikeFeedResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleLike(id: Int!): LikeFeedResult
  }
`;
