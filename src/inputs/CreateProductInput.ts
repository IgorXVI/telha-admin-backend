import { InputType, Field, Int } from "type-graphql"

@InputType()
export class CreateProductInput {
    @Field({ nullable: true })
    executionStart?: Date

    @Field({ nullable: true })
    executionEnd?: Date

    @Field(() => Int)
    size: number

    @Field(() => Int)
    quantity: number

    @Field(() => Int)
    number: number
}