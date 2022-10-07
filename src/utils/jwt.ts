import jwt from "jsonwebtoken";
import config from "config";

const publicKey = Buffer.from(config.get<string>("publicKey"), "base64").toString();
const privateKey = Buffer.from(config.get<string>("privateKey"), "base64").toString();

export const signJwt = (obj: Object, options?: jwt.SignOptions) => {
  return jwt.sign(obj, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
};
