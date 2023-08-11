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
              Company: {
                select: {
                  id: true,
                  name: true,
                  visible_name: true
                }
              }
            }
          },
          Assignation: {
            select: {
              Client: {
                select: {
                  id: true,
                  name: true,
                  comercial_name: true
                }
              },
              Project: {
                select: {
                  id: true,
                  name: true
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
          email: true,
          active: true,
          reports_to: true,
          names: true,
          lastname: true,
          created_At: true,
          UserType: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        where: {
          OR: [
            { CompanyUser: { some: { company_id: defaultCompanyID }, } },
            { CompanyUser: { some: { company_id: companyID }, } }
          ], 
        },
        distinct: ['username']
      });
  
      return result;
    } catch (error) {
      console.error('Error listUsers:', error);
      throw new Error('An error occurred while listing Users');
    }
  }
  static async listUsersContratos(defaultCompanyID, companyID) {
    try {
      if (defaultCompanyID === undefined) {
        throw new Error('Se requiere variable defaultCompanyID');
      }
  
      const result = await prisma.User.findMany({
        select: {
          id: true,
          username: true,
          user_type: true,
          email: true,
          active: true,
          reports_to: true,
          names: true,
          lastname: true,
          created_At: true,
          UserType: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        where: {
          OR: [
            { CompanyUser: { some: { company_id: defaultCompanyID }, } },
            { CompanyUser: { some: { company_id: companyID }, } }
          ], 
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
          active: userData.active,
          user_type: userData.user_type,
          reports_to: userData.reports_to,
          names: userData.names,
          lastname: userData.lastname,
          status: userData.status,
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
  static async createUserContratos(userData) {
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
      if(userData.password == undefined || userData.password == null ){
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
      }
      else {
        const hashedPassword = md5(userData.password)
        const result = await prisma.user.update({
          where: { id: userData.id },
          data: {
            username: userData.username,
            password: hashedPassword,
            user_type: userData.user_type,
            active: userData.active,
            reports_to: userData.reports_to,
            names: userData.names,
            lastname: userData.lastname,
            email: userData.email,
            updated_At: new Date(),
          }
        });
      }
      return result
    } catch (error) {
      console.error('Error updateUser:', error);
      throw new Error('An error occurred while updating the user')
    }
  }

  static async updateUserContratos(userData) {
    try {
      if(userData.password == undefined || userData.password == null ){
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
        const result2 = await prisma.companyUser.update({
          where: {
            user_id: result.Users.id
          },
          data: {
            company_id: userData.company_id
          }
        });  
      }
      else {
        const hashedPassword = md5(userData.password)
        const result = await prisma.user.update({
          where: { id: userData.id },
          data: {
            username: userData.username,
            password: hashedPassword,
            user_type: userData.user_type,
            active: userData.active,
            reports_to: userData.reports_to,
            names: userData.names,
            lastname: userData.lastname,
            email: userData.email,
            updated_At: new Date(),
          }
        });
        const result2 = await prisma.companyUser.update({
          where: {
            user_id: result.Users.id
          },
          data: {
            company_id: userData.company_id
          }
        });        
      }
      return result
    } catch (error) {
      console.error('Error updateUser:', error);
      throw new Error('An error occurred while updating the user')
    }
  }
}