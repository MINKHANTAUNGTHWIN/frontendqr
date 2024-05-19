/*
  Warnings:

  - You are about to drop the `AttendanceRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AttendanceRecord";

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "helperID" INTEGER,
    "helperName" TEXT,
    "customerName" TEXT,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "work_status" INTEGER DEFAULT 0,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);
