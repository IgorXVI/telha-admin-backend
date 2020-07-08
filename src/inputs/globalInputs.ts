import { Field, InputType, Int, ClassType } from "type-graphql"

import { SortEnum } from "../enums/globalEnums"

@InputType()
export class PaginationInput {
    @Field(() => Int, { nullable: true })
    skip?: number

    @Field(() => Int, { nullable: true })
    take?: number
}

@InputType()
export class BaseFilterInput {
    @Field({ nullable: true })
    id?: string

    @Field({ nullable: true })
    createdAt?: string

    @Field({ nullable: true })
    updatedAt?: string
}

@InputType()
export class BaseSortInput {
    @Field(() => SortEnum, { nullable: true })
    id?: SortEnum

    @Field(() => SortEnum, { nullable: true })
    createdAt?: SortEnum

    @Field(() => SortEnum, { nullable: true })
    updatedAt?: SortEnum
}

export const makeFindManyOptionsInput = <
    FilterSchema extends ClassType,
    SortSchema extends ClassType
>(
    FilterSchema: FilterSchema,
    SortSchema: SortSchema
) => {
    @InputType()
    class FindManyOptionsInput extends PaginationInput {
        @Field(() => FilterSchema, { nullable: true })
        where?: FilterSchema

        @Field(() => SortSchema, { nullable: true })
        order?: SortSchema
    }
    return FindManyOptionsInput
}