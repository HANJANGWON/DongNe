require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";
import { getUser, protectResolver } from "./src/users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});
const PORT = process.env.PORT;

server
  .listen()
  .then(() => console.log(`Server is running http:localhost.${PORT}/`));
