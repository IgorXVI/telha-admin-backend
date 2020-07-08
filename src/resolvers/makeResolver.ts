import { Resolver, Mutation, Arg, Query, ClassType } from "type-graphql"
import { In } from "typeorm"
import { UserInputError } from "apollo-server"

interface TypeORMModel extends ClassType {
    find: Function,
    findOne: Function,
    findAndCount: Function,
    create: Function,
    delete: Function,
    update: Function
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

        @Query(() => [Model], { nullable: true })
        async [nameFun("findManyByIds")](
            @Arg("ids", () => [String])
            ids: [string]
        ) {
            return Model.find({
                where: {
                    id: In(ids)
                }
            })
        }

        @Query(() => Model, { nullable: true })
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
        async [nameFun("updateOne")](
            @Arg("id")
            id: string,
            @Arg("data", () => UpdateInput)
            data: UpdateInput
        ) {
            const instance = await Model.findOne({ where: { id } })

            if (!instance) throw new UserInputError(`${Model.name} not found!`)

            Object.assign(instance, data)

            await instance.save()

            return instance
        }

        @Mutation(() => [String])
        async [nameFun("updateMany")](
            @Arg("ids", () => [String])
            ids: [string],
            @Arg("data", () => UpdateInput)
            data: UpdateInput
        ) {
            await Model.update({
                where: {
                    id: In(ids)
                }
            }, data)

            return ids
        }

        @Mutation(() => Model)
        async [nameFun("deleteOne")](
            @Arg("id")
            id: string
        ) {
            const instance = await Model.findOne({ where: { id } })

            if (!instance) throw new UserInputError(`${Model.name} not found!`)

            await instance.remove()

            return instance
        }

        @Mutation(() => [String])
        async [nameFun("deleteMany")](
            @Arg("ids", () => [String])
            ids: [string]
        ) {
            await Model.delete({
                where: {
                    id: In(ids)
                }
            })

            return ids
        }

    }

    return CrudResolver
}