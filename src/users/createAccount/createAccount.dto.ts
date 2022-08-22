import { User } from "@prisma/client";

export type CreateAccountInput = Pick<
  User,
  "firstName" | "lastName" | "email" | "username" | "password"
>;
