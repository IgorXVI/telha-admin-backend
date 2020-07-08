import { ObjectType, Field, Int, ClassType } from "type-graphql"

export const makeFindManyOutput = <Model extends ClassType>(
    Model: Model
) => {
    @ObjectType()
    class FindManyOutput {
        @Field(() => Int)
        total: number

        @Field(() => [Model], {  nullable: true })
        elements: [Model]
    }
    return FindManyOutput
}