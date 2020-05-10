import { Entity, BaseEntity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

import { Product } from "./Product"
@Entity()
@ObjectType()
export class Machine extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    id: string

    @Field()
    @CreateDateColumn({ type: "datetime" })
    createdAt: Date

    @Field()
    @UpdateDateColumn({ type: "datetime" })
    updatedAt: Date

    @Field(() => Product, { nullable: true })
    @OneToMany(() => Product, ProductInstance => ProductInstance.Machine) // note: we will create author property in the Photo class below
    Products: Product[]
}