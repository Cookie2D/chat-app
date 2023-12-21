/*
  Warnings:

  - You are about to drop the column `banned` on the `useronchat` table. All the data in the column will be lost.
  - You are about to drop the column `muted` on the `useronchat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `banned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `muted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `useronchat` DROP COLUMN `banned`,
    DROP COLUMN `muted`;
