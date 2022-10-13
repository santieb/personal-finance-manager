-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_categoryId_fkey";

-- AlterTable
ALTER TABLE "Operation" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
