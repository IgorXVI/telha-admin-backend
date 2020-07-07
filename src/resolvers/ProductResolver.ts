import { Resolver } from "type-graphql"
import { Product } from "../models/Product"
import { CreateProductInput } from "../inputs/CreateProductInput"
import { UpdateProductInput } from "../inputs/UpdateProductInput"

import { makeCrudResolver } from "./makeResolver"
@Resolver()
export class ProductResolver extends makeCrudResolver(
    Product,
    CreateProductInput,
    UpdateProductInput
) {  } 