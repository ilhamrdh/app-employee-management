-- AlterTable
ALTER TABLE "employee_history" ADD COLUMN     "new_name" TEXT,
ADD COLUMN     "old_name" TEXT;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
