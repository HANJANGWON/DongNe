-- AlterTable
ALTER TABLE "Feed" ADD COLUMN     "dongtagId" INTEGER;

-- CreateTable
CREATE TABLE "Dongtag" (
    "id" SERIAL NOT NULL,
    "dongtag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dongtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DongtagToFeed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dongtag_dongtag_key" ON "Dongtag"("dongtag");

-- CreateIndex
CREATE UNIQUE INDEX "_DongtagToFeed_AB_unique" ON "_DongtagToFeed"("A", "B");

-- CreateIndex
CREATE INDEX "_DongtagToFeed_B_index" ON "_DongtagToFeed"("B");

-- AddForeignKey
ALTER TABLE "_DongtagToFeed" ADD CONSTRAINT "_DongtagToFeed_A_fkey" FOREIGN KEY ("A") REFERENCES "Dongtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DongtagToFeed" ADD CONSTRAINT "_DongtagToFeed_B_fkey" FOREIGN KEY ("B") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
