import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFeedLikes(id: Int!): [User]
  }
`;
