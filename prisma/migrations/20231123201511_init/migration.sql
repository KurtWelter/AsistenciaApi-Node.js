/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");
