/*
  Warnings:

  - You are about to drop the column `type` on the `notification` table. All the data in the column will be lost.
  - Added the required column `status` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusNotification" AS ENUM ('running', 'postpone', 'suspend', 'end', 'draft', 'canceled');

-- CreateEnum
CREATE TYPE "StatusHistoryNotification" AS ENUM ('success', 'fail');

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "type",
ADD COLUMN     "status" "StatusNotification" NOT NULL,
ADD COLUMN     "suspended_until" TIMESTAMP(3);

-- DropEnum
DROP TYPE "TypeNotification";

-- CreateTable
CREATE TABLE "history_notification" (
    "id" SERIAL NOT NULL,
    "status" "StatusHistoryNotification" NOT NULL,
    "channel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "notification_id" INTEGER NOT NULL,

    CONSTRAINT "history_notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history_notification" ADD CONSTRAINT "history_notification_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
