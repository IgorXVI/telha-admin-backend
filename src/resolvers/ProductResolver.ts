import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { UserInputError } from "apollo-server"
import { Product } from "../models/Product"
import { CreateProductInput } from "../inputs/CreateProductInput"
import { UpdateProductInput } from "../inputs/UpdateProductInput"
@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    Products() {
        return Product.find()
    }

    @Query(() => Product)
    Product(@Arg("id") id: string) {
        return Product.findOne({ where: { id } })
    }

    @Mutation(() => Product)
    async createProduct(@Arg("data") data: CreateProductInput) {
        const existingProduct = await Product.findOne({ where: data })
        if (existingProduct) throw new UserInputError("Product already exists!")
        const ProductInstance = Product.create(data)
        await ProductInstance.save()
        return ProductInstance
    }

    @Mutation(() => Product)
    async updateProduct(@Arg("id") id: string, @Arg("data") data: UpdateProductInput) {
        const ProductInstance = await Product.findOne({ where: { id } })
        if (!ProductInstance) throw new UserInputError("Product not found!")
        Object.assign(Product, data)
        await ProductInstance.save()
        return ProductInstance
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id") id: string) {
        const ProductInstance = await Product.findOne({ where: { id } })
        if (!ProductInstance) throw new UserInputError("Product not found!")
        await ProductInstance.remove()
        return true
    }
}