import { InputType, Field } from "type-graphql"

@InputType()
export class UpdateMachineInput {
  @Field({ nullable: true })
  id?: string
}