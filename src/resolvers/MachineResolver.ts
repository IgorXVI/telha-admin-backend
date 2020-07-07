import { Resolver } from "type-graphql"
import { Machine } from "../models/Machine"
import { CreateMachineInput } from "../inputs/CreateMachineInput"
import { UpdateMachineInput } from "../inputs/UpdateMachineInput"

import { makeCrudResolver } from "./makeResolver"

@Resolver()
export class MachineResolver extends makeCrudResolver(
    Machine,
    CreateMachineInput,
    UpdateMachineInput
) {  }