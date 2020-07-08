import { registerEnumType } from "type-graphql"

enum SortEnum {
    ASC = "ASC",
    DESC = "DESC"
}

registerEnumType(SortEnum, {
    name: "SortEnum"
})

export { SortEnum }