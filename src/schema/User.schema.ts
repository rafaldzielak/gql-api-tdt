import { getModelForClass, prop, pre, queryMethod, index } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";

type QueryHelpers = {
  findByEmail: AsQueryMethod<typeof findByEmail>;
};

function findByEmail(this: ReturnModelType<typeof User, QueryHelpers>, email: User["email"]) {
  return this.findOne({ email });
}

@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
})
@queryMethod(findByEmail)
@index({ email: 1 })
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

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @MaxLength(50, { message: "Password must not be longer than 50 characters" })
  @Field(() => String)
  password: string;
}
@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;
}
