import {MigrationInterface, QueryRunner} from "typeorm";

export class segunda1594234639340 implements MigrationInterface {
    name = 'segunda1594234639340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `id` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD PRIMARY KEY (`id`)", undefined);
    }

}
