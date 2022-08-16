require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import prisma from "./client";

const PORT = process.env.PORT;

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        prisma,
      };
    },
  });
  await server.start();
  const app = express();
  app.use(logger("tiny"));
  app.use("/static", express.static("src/uploads"));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((func: any) => app.listen({ port: PORT }, func));
  console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();
