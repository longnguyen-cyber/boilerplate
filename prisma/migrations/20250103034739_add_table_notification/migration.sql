-- CreateEnum
CREATE TYPE "TypeSchedule" AS ENUM ('daily', 'weekly', 'monthly');

-- CreateEnum
CREATE TYPE "TypeNotification" AS ENUM ('running', 'postpone', 'suspend', 'end', 'draft', 'canceled');

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time_start" TIMESTAMP(3) NOT NULL,
    "time_end" TIMESTAMP(3) NOT NULL,
    "time_schedule" TEXT NOT NULL,
    "type_schedule" "TypeSchedule" NOT NULL,
    "received" INTEGER NOT NULL DEFAULT 0,
    "responsed" INTEGER NOT NULL DEFAULT 0,
    "total_send" INTEGER NOT NULL DEFAULT 0,
    "type" "TypeNotification" NOT NULL,
    "channels" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "message_id" INTEGER NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
