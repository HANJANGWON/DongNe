import { Context } from "src/types";
import * as createAccountResolver from "../../users/createAccount/createAccount.resolvers";
import { MockContext, createMockContext } from "../../context";

const {
  default: {
    Mutation: { createAccount },
  },
} = createAccountResolver;

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test("should create new user ", async () => {
  const user = {
    id: 1,
    username: "test",
    email: "test@gmail.com",
    firstName: "te",
    lastName: "st",
    password: "123",
    bio: "test",
    avatar: "test",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockCtx.prisma.user.create.mockResolvedValue(user);

  await expect(createAccount(null, user, ctx, null)).resolves.toEqual({
    ok: true,
  });
});
