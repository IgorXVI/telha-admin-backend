import { Entity, BaseEntity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@Entity()
@ObjectType()
export class Machine extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    id: string

    @Field(() => String)
    @CreateDateColumn({ type: "datetime" })
    createdAt: Date
}