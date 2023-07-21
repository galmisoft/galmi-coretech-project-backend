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

  static async deleteUser(userID) {
    try {
      const result = await prisma.user.delete({ where: { id: userId } });
      return result
    } catch (error) {
      console.error('Error deleteUser:', error);
      throw new Error('An error occurred while deleting the user')
    }
  }

  static async createUser(userData) {
    try {
      const result = await prisma.user.create({ 
        data: {
          dni: userData.dni,
          username: userData.username,
          supervisor_id: userData.userID,
          email: userData.mail,
          surname1: userData.name,
          surname2: userData.lastname,
          full_name: `${userData.name} ${userData.lastname}`,
      } });
      return result
    } catch (error) {
      console.error('Error createUser:', error);
      throw new Error('An error occurred while creating the user')
    }
  }

  static async updateUser(userData) {
    try {
      const result = await prisma.user.update({ 
        where: { id: userData.id },
        data: {
          dni: userData.dni,
          username: userData.username,
          supervisor_id: userData.userID,
          email: userData.mail,
          surname1: userData.name,
          surname2: userData.lastname,
          full_name: `${userData.name} ${userData.lastname}`,
      } });
      return result
    } catch (error) {
      console.error('Error updateUser:', error);
      throw new Error('An error occurred while updating the user')
    }
  }
}