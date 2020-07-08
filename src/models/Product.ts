import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { ObjectType, Field, ID, Int } from "type-graphql"

import { Machine } from "./Machine"

@Entity()
@ObjectType()
export class Product extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @CreateDateColumn({ type: "datetime" })
    createdAt: Date

    @Field()
    @UpdateDateColumn({ type: "datetime" })
    updatedAt: Date

    @Field({ nullable: true })
    @Column({ type: "datetime", nullable: true })
    executionStart?: Date

    @Field({ nullable: true })
    @Column({ type: "datetime", nullable: true })
    executionEnd?: Date

    @Field(() => Int)
    @Column()
    size: number

    @Field(() => Int)
    @Column()
    quantity: number

    @Field({ nullable: true })
    @Column()
    machineId: string

    @Field(() => Machine, { nullable: true })
    @ManyToOne(() => Machine, MachineInstance => MachineInstance.Products)
    Machine: Machine
}