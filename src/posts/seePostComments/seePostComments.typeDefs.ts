import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seePostComments(id: Int!, lastId: Int): [Comment]
  }
`;
