-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userEmail_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
