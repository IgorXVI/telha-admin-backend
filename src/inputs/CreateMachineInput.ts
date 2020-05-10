import { InputType, Field } from "type-graphql"

@InputType()
export class CreateMachineInput {
  @Field()
  id: string
}