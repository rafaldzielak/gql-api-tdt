import { Query, Resolver } from "type-graphql";
import { User } from "../schema/User.schema";

@Resolver()
export default class UserResolver {
  @Query(() => User)
  me() {
    return {
      _id: "123",
      name: "Rafa",
      email: "rafa@gmail.com",
    };
  }
}
