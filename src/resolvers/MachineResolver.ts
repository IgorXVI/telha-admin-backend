import { Resolver } from "type-graphql"
import { Machine } from "../models/Machine"
import { CreateMachineInput, UpdateMachineInput, FindManyMachinesInput } from "../inputs/machineInputs"
import { FindManyMachinesOutput } from "../outptus/machineOutputs"

import { makeCrudResolver } from "./makeResolver"

@Resolver()
export class MachineResolver extends makeCrudResolver(
    Machine,
    CreateMachineInput,
    UpdateMachineInput,
    FindManyMachinesInput,
    FindManyMachinesOutput
) {  }