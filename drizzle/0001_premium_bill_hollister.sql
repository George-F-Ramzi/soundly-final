ALTER TABLE `Notification` RENAME COLUMN `nottifier` TO `notifier`;--> statement-breakpoint
ALTER TABLE `Artists` ADD `following` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `Artists` DROP COLUMN `follwoing`;