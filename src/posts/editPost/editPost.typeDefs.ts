import { gql } from "apollo-server-express";

export default gql`
  type EditPostResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editPost(id: Int!, caption: String!): EditPostResult!
  }
`;
