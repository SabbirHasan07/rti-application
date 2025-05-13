/*
  Warnings:

  - Added the required column `address` to the `Appeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appealOfficer` to the `Appeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantName` to the `Appeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officerName` to the `Appeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Appeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceNo` to the `Appeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseDate` to the `Appeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appeal" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "appealOfficer" TEXT NOT NULL,
ADD COLUMN     "applicantName" TEXT NOT NULL,
ADD COLUMN     "officerName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "referenceNo" TEXT NOT NULL,
ADD COLUMN     "responseDate" TIMESTAMP(3) NOT NULL;
