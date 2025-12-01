-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STANDARD', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STANDARD';
