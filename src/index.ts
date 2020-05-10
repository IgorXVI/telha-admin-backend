import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"

import { BookResolver } from "./resolvers/BookResolver"

(async () => {
  await createConnection()
  const schema = await buildSchema({
    validate: false,
    resolvers: [BookResolver]
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started on port 4000!")
})()