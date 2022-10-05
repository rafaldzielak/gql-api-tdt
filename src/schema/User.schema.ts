import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => String) // gql type
  _id: string; // ts type

  @Field(() => String)
  @prop({ required: true }) // mongoDB type
  name: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;
}
