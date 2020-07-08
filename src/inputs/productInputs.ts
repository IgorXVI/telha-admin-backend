import { InputType, Field, Int } from "type-graphql"

import { SortEnum } from "../enums/globalEnums"
import { BaseFilterInput, BaseSortInput, makeFindManyOptionsInput } from "../inputs/globalInputs"

@InputType()
export class CreateProductInput {
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

@InputType()
export class UpdateProductInput {
    @Field({ nullable: true })
    size?: number

    @Field({ nullable: true })
    quantity?: number

    @Field({ nullable: true })
    executionStart?: Date

    @Field({ nullable: true })
    executionEnd?: Date
}


@InputType()
class SortProductInput extends BaseSortInput {
    @Field({ nullable: true })
    size?: SortEnum

    @Field({ nullable: true })
    quantity?: SortEnum

    @Field({ nullable: true })
    executionStart?: SortEnum

    @Field({ nullable: true })
    executionEnd?: SortEnum
}

@InputType()
class FilterProductInput extends BaseFilterInput {
    @Field({ nullable: true })
    size?: string

    @Field({ nullable: true })
    quantity?: string

    @Field({ nullable: true })
    executionStart?: string

    @Field({ nullable: true })
    executionEnd?: string
}

@InputType()
export class FindManyProductsInput extends makeFindManyOptionsInput(
    FilterProductInput,
    SortProductInput
) { }