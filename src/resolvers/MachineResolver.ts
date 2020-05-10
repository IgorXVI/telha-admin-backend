import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { UserInputError } from "apollo-server"
import { Machine } from "../models/Machine"
import { CreateMachineInput } from "../inputs/CreateMachineInput"

@Resolver()
export class MachineResolver {
    @Query(() => [Machine])
    Machines() {
        return Machine.find()
    }

    @Query(() => Machine)
    Machine(@Arg("id") id: string) {
        return Machine.findOne({ where: { id } })
    }

    @Mutation(() => Machine)
    async createMachine(@Arg("data") data: CreateMachineInput) {
        const existingMachine = await Machine.findOne({ where: data })
        if (existingMachine) throw new UserInputError("Machine already exists!")
        const MachineInstance = Machine.create(data)
        await MachineInstance.save()
        return MachineInstance
    }

    @Mutation(() => Boolean)
    async deleteMachine(@Arg("id") id: string) {
        const MachineInstance = await Machine.findOne({ where: { id } })
        if (!MachineInstance) throw new UserInputError("Machine not found!")
        await MachineInstance.remove()
        return true
    }
}