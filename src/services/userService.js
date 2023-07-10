import { JwtAuth } from "../auth/jwtAuth.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserService {
  static async validateUser(user) {
   const result = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })
    if (result) return JwtAuth.sign(user);
    return false;
  }

  static validateToken(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodetoken = JwtAuth.verify(token);
    return decodetoken;
  }
}