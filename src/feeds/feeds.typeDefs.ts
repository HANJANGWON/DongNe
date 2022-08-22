import { gql } from "apollo-server-express";

export default gql`
  type Feed {
    id: Int!
    user: User!
    file: String!
    caption: String!
    dongtags: [Dongtag]
    createdAt: String!
    updatedAt: String!
  }

  type Dongtag {
    id: Int!
    dongtag: String!
    feeds: [Feed]
    createdAt: String!
    updatedAt: String!
  }
`;
