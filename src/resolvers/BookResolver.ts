import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { UserInputError } from "apollo-server"
import { Book } from "../models/Book"
import { CreateBookInput } from "../inputs/CreateBookInput"
import { UpdateBookInput } from "../inputs/UpdateBookInput"
@Resolver()
export class BookResolver {
    @Query(() => [Book])
    Books() {
        return Book.find()
    }

    @Query(() => Book)
    Book(@Arg("id") id: string) {
        return Book.findOne({ where: { id } })
    }

    @Mutation(() => Book)
    async createBook(@Arg("data") data: CreateBookInput) {
        const BookInstance = Book.create(data)
        await BookInstance.save()
        return BookInstance
    }

    @Mutation(() => Book)
    async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
        const BookInstance = await Book.findOne({ where: { id } })
        if (!BookInstance) throw new UserInputError("Book not found!")
        Object.assign(Book, data)
        await BookInstance.save()
        return BookInstance
    }

    @Mutation(() => Boolean)
    async deleteBook(@Arg("id") id: string) {
        const BookInstance = await Book.findOne({ where: { id } })
        if (!BookInstance) throw new UserInputError("Book not found!")
        await BookInstance.remove()
        return true
    }
}