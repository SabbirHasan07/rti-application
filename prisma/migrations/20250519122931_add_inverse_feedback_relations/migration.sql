/*
  Warnings:

  - You are about to drop the column `appeal` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `appealId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAppeal` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "appeal",
ADD COLUMN     "appealId" TEXT NOT NULL,
ADD COLUMN     "applicationId" TEXT NOT NULL,
ADD COLUMN     "isAppeal" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetCode" TEXT,
ADD COLUMN     "resetCodeExpiry" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_appealId_fkey" FOREIGN KEY ("appealId") REFERENCES "Appeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
