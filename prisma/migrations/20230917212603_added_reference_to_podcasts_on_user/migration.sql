-- AlterTable
ALTER TABLE "podcasts" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
