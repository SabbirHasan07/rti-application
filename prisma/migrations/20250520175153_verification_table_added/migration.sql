/*
  Warnings:

  - Added the required column `isNotified` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPhoneNumberVerified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "isNotified" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPhoneNumberVerified" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "PhoneVerification" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL,

    CONSTRAINT "PhoneVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhoneVerification_phone_key" ON "PhoneVerification"("phone");
