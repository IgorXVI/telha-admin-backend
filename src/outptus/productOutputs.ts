import { ObjectType } from "type-graphql"

import { makeFindManyOutput } from "./globalOutputs"
import { Product } from "../models/Product"

@ObjectType()
export class FindManyProductsOutput extends makeFindManyOutput(Product) { }