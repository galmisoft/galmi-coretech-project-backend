import { JwtAuth } from "../../auth/jwtAuth.js";
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

  static async deleteUser(id) {
    try {
      const result = await prisma.user.delete({ where: { id: id } });
      return result
    } catch (error) {
      console.error('Error deleteUser:', error);
      throw new Error('An error occurred while deleting the user')
    }
  }

  static async listUsers(companyID, username) {
    try {
      const result = await prisma.User.findMany({
          where: {
              CompanyUser: { 
                every: {
                  company_id: { contains: companyID === undefined ? "" : companyID }
                }
              },
              name: { contains: username === undefined ? "" : username } 
          },
          include: {
              UserType: {
                select: {
                  id: true,
                  name: true,
                }
              }
          },
          distinct: ['username']
      })
      return result
    } catch (error) {
      console.error('Error listUsers:', error);
      throw new Error('An error occurred while listing Users')
    }
  }

  static async createUser(userData) {
    try {
      const result = await prisma.user.create({ 
        data: {
          username: userData.username,
          user_type: userData.user_type,
          active: userData.active,
          reports_to: userData.reports_to,
          names: userData.names,
          lastname: userData.lastname,
          email: userData.email,
          created_At: new Date(),
          updated_At: new Date(),
      }});

      const result2 = await prisma.companyUser.create({
        data: {
          company_id: userData.company_id,
          user_id: result.Users.id
        }
      })
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
          dni_type: userData.dni_type,
          dni: userData.dni,
          username: userData.username,
          user_type: userData.user_type,
          reports_to: userData.reports_to,
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          status: userData.status,
          phone: userData.phone,
          photo_code: userData.photo_code,
          active: userData.active,
          created_At: new Date(),
          updated_At: new Date(),
      } });
      return result
    } catch (error) {
      console.error('Error updateUser:', error);
      throw new Error('An error occurred while updating the user')
    }
  }
}