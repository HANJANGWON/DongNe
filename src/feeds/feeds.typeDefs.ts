import { gql } from "apollo-server-express";

export default gql`
  type Feed {
    id: Int!
    user: User!
    file: String!
    caption: String!
    dongtags: [Dongtag]
    likes: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Dongtag {
    id: Int!
    dongtag: String!
    feeds(page: Int!): [Feed]
    totalFeeds: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    feed: Feed
    createdAt: String!
    updatedAt: String!
  }
`;
