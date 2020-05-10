import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ObjectType, Field, ID, Int } from "type-graphql"

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

    @Field(() => Int)
    @Column()
    number: number
}