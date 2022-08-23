import { Feed } from "@prisma/client";

export type EditFeedInput = Pick<Feed, "id" | "caption">;
