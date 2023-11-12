/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `slug` on the `MenuCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categorySlug` on the `MenuItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategorySlugEnum" AS ENUM ('PIZZA', 'PASTA', 'BURGER');

-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('PENDING', 'PAID', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_categorySlug_fkey";

-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "slug",
ADD COLUMN     "slug" "CategorySlugEnum" NOT NULL;

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "categorySlug",
ADD COLUMN     "categorySlug" "CategorySlugEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatusEnum" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateIndex
CREATE UNIQUE INDEX "MenuCategory_slug_key" ON "MenuCategory"("slug");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "MenuCategory"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
