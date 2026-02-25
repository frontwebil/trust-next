/*
  Warnings:

  - Added the required column `netCrypto` to the `HashAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HashAddress" ADD COLUMN     "netCrypto" TEXT NOT NULL;
