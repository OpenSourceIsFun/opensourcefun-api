-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "discord" TEXT,
ADD COLUMN     "siteUrl" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "twitter" TEXT;

-- DropEnum
DROP TYPE "AddressStatusTypes";

-- DropEnum
DROP TYPE "SaleStatusTypes";
