/*
  Warnings:

  - You are about to drop the column `bannerUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `GleamCallback` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[logoFileId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannerFileId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GleamCallback" DROP CONSTRAINT "GleamCallback_userId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "bannerUrl",
DROP COLUMN "logoUrl",
ADD COLUMN     "bannerFileId" TEXT,
ADD COLUMN     "logoFileId" TEXT;

-- DropTable
DROP TABLE "GleamCallback";

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "extension" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_logoFileId_key" ON "Project"("logoFileId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_bannerFileId_key" ON "Project"("bannerFileId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_logoFileId_fkey" FOREIGN KEY ("logoFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_bannerFileId_fkey" FOREIGN KEY ("bannerFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
