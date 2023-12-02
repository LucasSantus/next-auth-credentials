-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetExpires" TEXT,
ADD COLUMN     "passwordResetToken" TEXT;
