import { ApolloServer } from "apollo-server-express";
import schema from "../../schema";
import prisma from "../../client";

const testServer = new ApolloServer({
  schema,
  context: async () => {
    return {
      prisma,
    };
  },
});

it("create user", async () => {
  const result = await testServer.executeOperation({
    query: `
    mutation($firstName: String!, $username: String!, $email: String!, $password: String!) {
      createAccount(firstName: $firstName, username: $username, email: $email, password: $password) {
        ok
      }
    }`,
    variables: {
      firstName: "te2",
      username: "test",
      email: "test2@test.com",
      password: "123",
    },
  });

  expect(result.data?.createAccount).toEqual({
    ok: true,
  });
});
