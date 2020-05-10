import { InputType, Field, Int } from "type-graphql"

@InputType()
export class CreateProductInput {
    @Field()
    id: string

    @Field()
    machineId: string

    @Field(() => Int)
    size: number

    @Field(() => Int)
    quantity: number

    @Field({ nullable: true })
    executionStart?: Date

    @Field({ nullable: true })
    executionEnd?: Date
}