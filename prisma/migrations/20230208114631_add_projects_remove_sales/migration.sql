/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapForSale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaleInfoForSale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMemberForSale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenInfoForSale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnSales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoadmapForSale" DROP CONSTRAINT "RoadmapForSale_saleId_fkey";

-- DropForeignKey
ALTER TABLE "SaleInfoForSale" DROP CONSTRAINT "SaleInfoForSale_saleId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMemberForSale" DROP CONSTRAINT "TeamMemberForSale_saleId_fkey";

-- DropForeignKey
ALTER TABLE "TokenInfoForSale" DROP CONSTRAINT "TokenInfoForSale_saleId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnSales" DROP CONSTRAINT "UsersOnSales_saleId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnSales" DROP CONSTRAINT "UsersOnSales_userId_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "RoadmapForSale";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "SaleInfoForSale";

-- DropTable
DROP TABLE "TeamMemberForSale";

-- DropTable
DROP TABLE "TokenInfoForSale";

-- DropTable
DROP TABLE "UsersOnSales";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "logoUrl" TEXT,
    "bannerUrl" TEXT,
    "overview" TEXT,
    "description" TEXT,
    "majorContributor" TEXT,
    "preferredExperience" TEXT,
    "totalAllocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_alias_key" ON "Project"("alias");
