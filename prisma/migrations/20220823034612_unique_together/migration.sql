/*
  Warnings:

  - A unique constraint covering the columns `[feedId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_feedId_userId_key" ON "Like"("feedId", "userId");
