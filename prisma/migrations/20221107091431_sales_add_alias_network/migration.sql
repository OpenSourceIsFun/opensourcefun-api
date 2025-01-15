/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "alias" TEXT,
ADD COLUMN     "network" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_alias_key" ON "Sale"("alias");
