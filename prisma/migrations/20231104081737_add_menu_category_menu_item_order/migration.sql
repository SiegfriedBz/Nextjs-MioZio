-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PAYMENTPENDING', 'PAID', 'CANCELLED', 'DELIVERING', 'DELIVERED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "status" "orderStatus" NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "stripeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "menuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "menuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuItemOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "additionalPrice" DOUBLE PRECISION NOT NULL,
    "menuItemId" TEXT NOT NULL,

    CONSTRAINT "menuItemOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderTomenuItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "menuCategory_slug_key" ON "menuCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderTomenuItem_AB_unique" ON "_OrderTomenuItem"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderTomenuItem_B_index" ON "_OrderTomenuItem"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItem" ADD CONSTRAINT "menuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "menuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItemOption" ADD CONSTRAINT "menuItemOption_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderTomenuItem" ADD CONSTRAINT "_OrderTomenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderTomenuItem" ADD CONSTRAINT "_OrderTomenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "menuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
