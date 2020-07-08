import {MigrationInterface, QueryRunner} from "typeorm";

export class primieria1594244898547 implements MigrationInterface {
    name = 'primieria1594244898547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `executionStart` datetime NULL, `executionEnd` datetime NULL, `size` int NOT NULL, `quantity` int NOT NULL, `machineId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `machine` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_d94b5df9b4383137c8927457dd6` FOREIGN KEY (`machineId`) REFERENCES `machine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_d94b5df9b4383137c8927457dd6`", undefined);
        await queryRunner.query("DROP TABLE `machine`", undefined);
        await queryRunner.query("DROP TABLE `product`", undefined);
    }

}
