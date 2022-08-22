import { Feed } from "@prisma/client";

export type UploadFeedInput = Pick<Feed, "file" | "caption">;
