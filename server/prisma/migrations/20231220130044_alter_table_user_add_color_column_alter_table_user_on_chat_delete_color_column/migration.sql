/*
  Warnings:

  - You are about to drop the column `color` on the `useronchat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `color` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `useronchat` DROP COLUMN `color`;
