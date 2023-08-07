import { JwtAuth } from "../../auth/jwtAuth.js";
import { PrismaClient } from "@prisma/client";
import md5 from 'md5';
const prisma = new PrismaClient();

export class UserService {
  static async validateUser(username, password) {
    try {
      const hashedPassword = md5(password)
      const result = await prisma.user.findMany({
        where: {
          AND: [
            { password: hashedPassword },
            { OR: [
              { username: username },
              { email: username }
            ]}
          ]        
        },
        include: {
          CompanyUser: {
            select: {
              id: true,
              Company: {
                select: {
                  name: true,
                  name: true,
                  visible_name: true
                }
              }
            }
          }
        }
      })
      if (result) {
        console.log(JSON.stringify({ result }))
        return JwtAuth.sign(JSON.stringify({ result }));
      }
      return false;
    } catch(error) {
      console.log(error)
      throw new Error('An error occurred while login')
    }
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

  static async listUsers(defaultCompanyID, companyID) {
    try {
      if (defaultCompanyID === undefined) {
        throw new Error('Se requiere variable defaultCompanyID');
      }
  
      const result = await prisma.User.findMany({
        select: {
          id: true,
          username: true,
          user_type: true,
          active: true,
          reports_to: true,
          names: true,
          lastname: true,
          email: true,
          created_At: true,
          updated_At: true
        },
        where: {
          OR: [
            { CompanyUser: { some: { company_id: defaultCompanyID }, } },
            { CompanyUser: { some: { company_id: companyID }, } }
          ], 
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
      });
  
      return result;
    } catch (error) {
      console.error('Error listUsers:', error);
      throw new Error('An error occurred while listing Users');
    }
  }
  static async createUser(userData) {
    try {
      const hashedPassword = md5(userData.password)
      const result = await prisma.user.create({
        data: {
          username: userData.username,
          password: hashedPassword,
          user_type: userData.user_type,
          active: userData.active,
          reports_to: userData.reports_to,
          names: userData.names,
          lastname: userData.lastname,
          email: userData.email,
          created_At: new Date(),
          updated_At: new Date(),
        }
      });

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
          username: userData.username,
          user_type: userData.user_type,
          active: userData.active,
          reports_to: userData.reports_to,
          names: userData.names,
          lastname: userData.lastname,
          email: userData.email,
          updated_At: new Date(),
        }
      });
      return result
    } catch (error) {
      console.error('Error updateUser:', error);
      throw new Error('An error occurred while updating the user')
    }
  }
}