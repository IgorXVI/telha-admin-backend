import { Resolver, Mutation, Arg, Query, ClassType } from "type-graphql"
import { UserInputError } from "apollo-server"

interface TypeORMModel extends ClassType {
    find: Function,
    findOne: Function,
    findAndCount: Function,
    create: Function
}

export const makeCrudResolver = <
    Model extends TypeORMModel,
    CreateInput extends ClassType,
    UpdateInput extends ClassType,
    FindManyInput extends ClassType,
    FindManyOutput extends ClassType
>(
    Model: Model,
    CreateInput: CreateInput,
    UpdateInput: UpdateInput,
    FindManyInput: FindManyInput,
    FindManyOutput: FindManyOutput
) => {

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
    const nameFun = (name: string) => `${name}${capitalize(Model.name)}`

    @Resolver({ isAbstract: true })
    class CrudResolver {
        @Query(() => FindManyOutput)
        async [nameFun("findMany")](
            @Arg("options", () => FindManyInput, { nullable: true })
            options?: FindManyInput
        ) {
            const [
                elements,
                total
            ] = await Model.findAndCount(options)

            return {
                total,
                elements
            }
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