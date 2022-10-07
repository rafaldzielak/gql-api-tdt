import { CreateUserInput, LoginInput, UserModel } from "../schema/User.schema";
import { ApolloError } from "apollo-server";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const errorMessage = "Invalid credentials";
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) throw new ApolloError(errorMessage);
    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) throw new ApolloError(errorMessage);
    const token = signJwt(user);
    context.res.cookie("accessToken", token, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return token;
  }
}

export default UserService;
