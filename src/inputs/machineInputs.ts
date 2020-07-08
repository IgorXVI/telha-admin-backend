import { InputType, Field } from "type-graphql"

import { BaseFilterInput, BaseSortInput, makeFindManyOptionsInput } from "../inputs/globalInputs"

@InputType()
export class CreateMachineInput {
  @Field()
  id: string
}

@InputType()
export class UpdateMachineInput {
  @Field({ nullable: true })
  id?: string
}

@InputType()
class SortMachineInput extends BaseSortInput { }

@InputType()
class FilterMachineInput extends BaseFilterInput { }

@InputType()
export class FindManyMachinesInput extends makeFindManyOptionsInput(
  FilterMachineInput,
  SortMachineInput
) {}