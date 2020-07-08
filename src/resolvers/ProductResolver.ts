import { Resolver } from "type-graphql"
import { Product } from "../models/Product"
import { CreateProductInput, UpdateProductInput, FindManyProductsInput } from "../inputs/productInputs"

import { makeCrudResolver } from "./makeResolver"
@Resolver()
export class ProductResolver extends makeCrudResolver(
    Product,
    CreateProductInput,
    UpdateProductInput,
    FindManyProductsInput
) {  } 