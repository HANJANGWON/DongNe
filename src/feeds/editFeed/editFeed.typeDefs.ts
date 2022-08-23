import { gql } from "apollo-server-express";

export default gql`
  type EditFeedResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editFeed(id: Int!, caption: String!): EditFeedResult!
  }
`;
