/*
  Warnings:

  - Added the required column `type` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeMessage" AS ENUM ('public', 'draft');

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "type" "TypeMessage" NOT NULL;
