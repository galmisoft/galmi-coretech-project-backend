import { JwtAuth } from "../auth/jwtAuth.js";

export class UserService {
  static validateUser(user) {
    const token = JwtAuth.sign(user);
    return token;
  }
}