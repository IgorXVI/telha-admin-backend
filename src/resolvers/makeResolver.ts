import { Resolver, Mutation, Arg, Query, ClassType, Field, InputType, Int } from "type-graphql"
import { UserInputError } from "apollo-server"

@InputType()
class PaginationInput {
    @Field(() => Int, { nullable: true })
    skip?: number

    @Field(() => Int, { nullable: true })
    take?: number
}

interface TypeORMModel extends ClassType {
    find: Function,
    findOne: Function,
    create: Function
}

export const makeCrudResolver = <
    Model extends TypeORMModel,
    CreateInput extends ClassType,
    UpdateInput extends ClassType
>(
    Model: Model,
    CreateInput: CreateInput,
    UpdateInput: UpdateInput
) => {

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
    const nameFun = (name: string) => `${name}${capitalize(Model.name)}`

    @Resolver({ isAbstract: true })
    class CrudResolver {
        @Query(() => [Model])
        [nameFun("findMany")](
            @Arg("options", { nullable: true })
            options?: PaginationInput
        ) {
            return Model.find(options)
        }

        @Query(() => Model)
        [nameFun("findOne")](
            @Arg("id")
            id: string
        ) {
            return Model.findOne({ where: { id } })
        }

        @Mutation(() => Model)
        async [nameFun("create")](
            @Arg("data", () => CreateInput)
            data: CreateInput
        ) {
            const existing = await Model.findOne({ where: data })

            if (existing) throw new UserInputError(`${Model.name} already exists!`)

            const instance = Model.create(data)

            await instance.save()

            return instance
        }

        @Mutation(() => Model)
        async [nameFun("update")](
            @Arg("id")
            id: string,
            @Arg("data", () => UpdateInput)
            data: UpdateInput
        ) {
            const instance = await Model.findOne({ where: { id } })

            if (!instance) throw new UserInputError(`${Model.name} not found!`)

            Object.assign(Model, data)

            await instance.save()

            return instance
        }

        @Mutation(() => Boolean)
        async [nameFun("deleteOne")](
            @Arg("id")
            id: string
        ) {
            const instance = await Model.findOne({ where: { id } })

            if (!instance) throw new UserInputError(`${Model.name} not found!`)

            await instance.remove()

            return true
        }

    }

    return CrudResolver
}