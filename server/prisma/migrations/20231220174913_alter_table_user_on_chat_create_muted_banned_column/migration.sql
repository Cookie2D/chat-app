-- AlterTable
ALTER TABLE `useronchat` ADD COLUMN `banned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `muted` BOOLEAN NOT NULL DEFAULT false;
