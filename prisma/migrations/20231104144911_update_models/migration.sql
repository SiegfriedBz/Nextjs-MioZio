/*
  Warnings:

  - You are about to drop the column `stripeId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `menuItem` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `menuItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the `_OrderTomenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menuItemOption` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[intent_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `menuCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categorySlug` to the `menuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `menuItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderTomenuItem" DROP CONSTRAINT "_OrderTomenuItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderTomenuItem" DROP CONSTRAINT "_OrderTomenuItem_B_fkey";

-- DropForeignKey
ALTER TABLE "menuItem" DROP CONSTRAINT "menuItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "menuItemOption" DROP CONSTRAINT "menuItemOption_menuItemId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stripeId",
DROP COLUMN "total",
ADD COLUMN     "cartItems" JSONB[],
ADD COLUMN     "intent_id" TEXT,
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "menuCategory" ADD COLUMN     "color" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "menuItem" DROP COLUMN "categoryId",
ADD COLUMN     "categorySlug" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "options" JSONB[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "_OrderTomenuItem";

-- DropTable
DROP TABLE "menuItemOption";

-- DropEnum
DROP TYPE "orderStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Order_intent_id_key" ON "Order"("intent_id");

-- AddForeignKey
ALTER TABLE "menuItem" ADD CONSTRAINT "menuItem_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "menuCategory"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
