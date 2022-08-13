import { gql } from "apollo-server"

export default gql`
    type CreateFeedResult{
        ok:boolean!
        error:string
    }
    type Mutation {
        createFeed(title:string,content:string):CreateFeedResult!
    }
`