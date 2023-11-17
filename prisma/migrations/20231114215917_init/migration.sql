/*
  Warnings:

  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondSurname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "secondSurname" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "ClassAttendance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "profesorList" VARCHAR(255) NOT NULL,
    "studentList" VARCHAR(255) NOT NULL,
    "studentRut" VARCHAR(255) NOT NULL,

    CONSTRAINT "ClassAttendance_pkey" PRIMARY KEY ("id")
);
