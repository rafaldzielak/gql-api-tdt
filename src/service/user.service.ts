import { UserModel } from "../schema/User.schema";

class UserService {
  async createUser(input: any) {
    return UserModel.create(input);
  }
}

export default UserService;
