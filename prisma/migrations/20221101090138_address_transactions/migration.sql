-- CreateEnum
CREATE TYPE "AddressStatusTypes" AS ENUM ('IN_PROGRESS', 'SUCCESS', 'FAILURE');

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "status" "AddressStatusTypes" NOT NULL DEFAULT 'IN_PROGRESS',
    "value" TEXT NOT NULL,
    "quoteCurrency" TEXT NOT NULL DEFAULT 'USD',
    "chainId" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "addressFrom" TEXT NOT NULL,
    "addressTo" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "successful" BOOLEAN NOT NULL,
    "valueQuote" DOUBLE PRECISION NOT NULL,
    "feesPaid" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "txOffset" INTEGER NOT NULL,
    "gasOffered" INTEGER NOT NULL,
    "gasSpent" INTEGER NOT NULL,
    "gasPrice" INTEGER NOT NULL,
    "gasQuote" DOUBLE PRECISION NOT NULL,
    "gasQuoteRate" DOUBLE PRECISION NOT NULL,
    "blockHeight" INTEGER NOT NULL,
    "blockSignedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_value_key" ON "Address"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txHash_key" ON "Transaction"("txHash");
