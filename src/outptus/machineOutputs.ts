import { ObjectType } from "type-graphql"

import { makeFindManyOutput } from "./globalOutputs"
import { Machine } from "../models/Machine"

@ObjectType()
export class FindManyMachinesOutput extends makeFindManyOutput(Machine) { }