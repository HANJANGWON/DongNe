import { gql } from "apollo-server-express";

export default gql`
  type Feed {
    id: String!
    user: User!
    file: String!
    caption: String!
    dongtag: [Dongtag]
    createdAt: String!
    updatedAt: String!
  }

  type Dongtag {
    id: String!
    dongtag: String!
    feeds: [Feed]
    createdAt: String!
    updatedAt: String!
  }
`;
