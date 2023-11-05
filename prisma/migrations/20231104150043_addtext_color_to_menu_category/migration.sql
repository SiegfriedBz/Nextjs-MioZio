/*
  Warnings:

  - You are about to drop the column `color` on the `menuCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "menuCategory" DROP COLUMN "color",
ADD COLUMN     "bgColor" TEXT,
ADD COLUMN     "textColor" TEXT;
