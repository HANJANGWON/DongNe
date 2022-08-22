import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    uploadFeed(file: String!, caption: String!): Feed
  }
`;
