import { GraphQLError } from "graphql"
import { ApolloError } from "apollo-server-express"

export const formatError = (error: GraphQLError) => {
    if (error instanceof ApolloError) {
        return error
    }
    else if (error.originalError instanceof ApolloError) {
        return error
    }
    else if (error.message === "Access denied! You don't have permission for this action!") {
        return new ApolloError(error.message, "UNAUTHORIZED")
    }
    else {
        console.error(JSON.stringify(error, null, 2))
        return new ApolloError("An unexpected error has occurred, please contact the team responsible for the application.", "INTERNAL_SERVER_ERROR")
    }
}