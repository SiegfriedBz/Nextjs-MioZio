/*
  Warnings:

  - The values [PAYMENTPENDING] on the enum `orderStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[name]` on the table `menuCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "orderStatus_new" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'DELIVERING', 'DELIVERED');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "orderStatus_new" USING ("status"::text::"orderStatus_new");
ALTER TYPE "orderStatus" RENAME TO "orderStatus_old";
ALTER TYPE "orderStatus_new" RENAME TO "orderStatus";
DROP TYPE "orderStatus_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "menuCategory_name_key" ON "menuCategory"("name");
