import { InputType, Field } from "type-graphql"

@InputType()
export class UpdateProductInput {
    @Field({ nullable: true })
    executionStart?: Date

    @Field({ nullable: true })
    executionEnd?: Date

    @Field({ nullable: true })
    size?: number

    @Field({ nullable: true })
    quantity?: number

    @Field({ nullable: true })
    number?: number
}