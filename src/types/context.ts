import { Request, Response } from "express";
import { User } from "../schema/User.schema";

type Context = {
  req: Request;
  res: Response;
  user: User;
};

export default Context;
