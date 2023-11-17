/*
  Warnings:

  - You are about to drop the column `profesorList` on the `ClassAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `studentList` on the `ClassAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `studentRut` on the `ClassAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ClassAttendance` table. All the data in the column will be lost.
  - Added the required column `subject` to the `ClassAttendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rut` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassAttendance" DROP COLUMN "profesorList",
DROP COLUMN "studentList",
DROP COLUMN "studentRut",
DROP COLUMN "time",
ADD COLUMN     "subject" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rut" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "_ClassAttendanceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassAttendanceToUser_AB_unique" ON "_ClassAttendanceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassAttendanceToUser_B_index" ON "_ClassAttendanceToUser"("B");

-- AddForeignKey
ALTER TABLE "_ClassAttendanceToUser" ADD CONSTRAINT "_ClassAttendanceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassAttendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassAttendanceToUser" ADD CONSTRAINT "_ClassAttendanceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
