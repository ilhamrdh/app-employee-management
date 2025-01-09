/*
  Warnings:

  - You are about to drop the column `new_department` on the `employee_history` table. All the data in the column will be lost.
  - You are about to drop the column `old_department` on the `employee_history` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee_history" DROP COLUMN "new_department",
DROP COLUMN "old_department",
ADD COLUMN     "new_department_id" INTEGER,
ADD COLUMN     "old_department_id" INTEGER;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "department";
