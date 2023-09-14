/*
  Warnings:

  - You are about to drop the column `created_at` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ListenLater` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_userId_fkey";

-- DropForeignKey
ALTER TABLE "ListenLater" DROP CONSTRAINT "ListenLater_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "ListenLater" DROP CONSTRAINT "ListenLater_userId_fkey";

-- DropForeignKey
ALTER TABLE "PodcastCategory" DROP CONSTRAINT "PodcastCategory_podcastId_fkey";

-- DropForeignKey
ALTER TABLE "PodcastUserStats" DROP CONSTRAINT "PodcastUserStats_podcastId_fkey";

-- DropForeignKey
ALTER TABLE "PodcastUserStats" DROP CONSTRAINT "PodcastUserStats_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_podcastId_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ListenLater" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "podcasts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodcastCategory" ADD CONSTRAINT "PodcastCategory_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "podcasts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListenLater" ADD CONSTRAINT "ListenLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListenLater" ADD CONSTRAINT "ListenLater_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodcastUserStats" ADD CONSTRAINT "PodcastUserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodcastUserStats" ADD CONSTRAINT "PodcastUserStats_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "podcasts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
