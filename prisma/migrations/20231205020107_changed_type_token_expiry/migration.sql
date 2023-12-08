/*
  Warnings:

  - Changed the type of `tokenExpiry` on the `VerificationToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "tokenExpiry",
ADD COLUMN     "tokenExpiry" TIMESTAMP(3) NOT NULL;
