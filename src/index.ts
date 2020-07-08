import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"

import { MachineResolver } from "./resolvers/MachineResolver"
import { ProductResolver } from "./resolvers/ProductResolver"
import { context } from "./apollo/context"
import { formatError } from "./apollo/formatError"

(async () => {
  await createConnection()
  const schema = await buildSchema({
    validate: true,
    resolvers: [
      MachineResolver,
      ProductResolver
    ],
  })
  const server = new ApolloServer({ schema, context, formatError, cors: true })
  await server.listen(4000)
  console.log("Server has started on port 4000!")
})()