import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { UserInputError } from "apollo-server"
import { Machine } from "../models/Machine"
import { CreateMachineInput } from "../inputs/CreateMachineInput"

@Resolver()
export class MachineResolver {
    @Query(() => [Machine])
    machines() {
        return Machine.find()
    }

    @Query(() => Machine)
    machine(@Arg("id") id: string) {
        return Machine.findOne({ where: { id } })
    }

    @Mutation(() => Machine)
    async createMachine(@Arg("data") data: CreateMachineInput) {
        const existingMachine = await Machine.findOne({ where: data })
        if (existingMachine) throw new UserInputError("Machine already exists!")
        const machine = Machine.create(data)
        await machine.save()
        return machine
    }

    @Mutation(() => Boolean)
    async deleteMachine(@Arg("id") id: string) {
        const machine = await Machine.findOne({ where: { id } })
        if (!machine) throw new UserInputError("Machine not found!")
        await machine.remove()
        return true
    }
}