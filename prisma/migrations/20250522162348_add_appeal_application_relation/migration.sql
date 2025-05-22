/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `Appeal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationId` to the `Appeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appeal" ADD COLUMN     "applicationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "hasAppealed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasGivenFeedback" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Appeal_applicationId_key" ON "Appeal"("applicationId");

-- AddForeignKey
ALTER TABLE "Appeal" ADD CONSTRAINT "Appeal_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
