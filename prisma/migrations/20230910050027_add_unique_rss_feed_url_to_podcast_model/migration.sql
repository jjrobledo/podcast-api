/*
  Warnings:

  - A unique constraint covering the columns `[rssFeedUrl]` on the table `podcasts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rssFeedUrl` to the `podcasts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "podcasts" ADD COLUMN     "rssFeedUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "podcasts_rssFeedUrl_key" ON "podcasts"("rssFeedUrl");
