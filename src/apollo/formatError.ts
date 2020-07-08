import { ApolloError } from "apollo-server-express"
import { ValidationError } from "apollo-server-errors"

export const formatError = (error: any) => {
    if (error instanceof ApolloError) {
        return error
    }
    else if (error.originalError instanceof ApolloError) {
        return new ValidationError(error.message)
    }
    else if (error.originalError.sqlMessage.startsWith("Cannot delete or update a parent row:")){
        return new ValidationError(error.originalError.sqlMessage)
    }
    else {
        console.error(JSON.stringify(error, null, 2))
        return new ApolloError("An unexpected error has occurred, please contact the team responsible for the application.", "INTERNAL_SERVER_ERROR")
    }
}