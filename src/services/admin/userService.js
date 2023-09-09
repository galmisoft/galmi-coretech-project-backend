import { JwtAuth } from "../../auth/jwtAuth.js";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
const prisma = new PrismaClient();

export class UserService {
  static async validateUser(username, password) {
    try {
      const hashedPassword = md5(password);
      const result = await prisma.user.findMany({
        where: {
          AND: [
            // { password: hashedPassword },
            { OR: [{ username: username }, { email: username }] },
          ],
        },
        include: {
          Assignation: {
            select: {
              Client: {
                select: {
                  id: true,
                  name: true,
                  comercial_name: true,
                },
              },
              Project: {
                select: {
                  id: true,
                  name: true,
                },
              },
              Equipment: {
                select: {
                  id: true,
                  name: true,
                  internal_code: true,
                  mine_code: true,
                },
              },
            },
          },
          UserPermission: {
            select: {
              active: true,
              module_id: true,
              Modules: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      if (result.length > 0) {
        const defaultCompany = await prisma.company.findUnique({
          where: { id: process.env.CORETECH_CODE },
          select: {
            id: true,
            name: true,
            visible_name: true,
          },
        });

        result[0].DefaultCompany = defaultCompany;
        return JwtAuth.sign(JSON.stringify({ result }));
      }
      throw new Error("Usuario y/o Contraseña invalido");
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while login");
    }
  }

  static validateToken(req) {
    const token = req.headers.authorization.split(" ")[1];
    const decodetoken = JwtAuth.verify(token);
    return decodetoken;
  }

  static async deleteUser(id) {
    try {
      const result2 = await prisma.companyUser.deleteMany({
        where: { user_id: id },
      });
      const result = await prisma.user.delete({ where: { id: id } });
      return result;
    } catch (error) {
      console.error("Error deleteUser:", error);
      throw new Error("An error occurred while deleting the user");
    }
  }

  static async listUsersContratos(companyID) {
    try {
      const result = await prisma.User.findMany({
        select: {
          id: true,
          username: true,
          user_type: true,
          names: true,
          lastname: true,
          reports_to: true,
          created_At: true,
          active: true,
          UserType: {
            select: {
              id: true,
              name: true,
            },
          },
          UserPermission: {
            select: {
              user_permission_id: true,
              module_id: true,
              active: true,
              Modules: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        where: { company_id: companyID },
        distinct: ["username"],
      });

      return result;
    } catch (error) {
      console.error("Error listUsers:", error);
      throw new Error("An error occurred while listing Users");
    }
  }
  static async listUsers() {
    try {
      const result = await prisma.User.findMany({
        select: {
          id: true,
          username: true,
          user_type: true,
          names: true,
          lastname: true,
          created_At: true,
          active: true,
          company_id: true,
          status: true,
          reports_to: true,
          Company: {
            select: {
              id: true,
              name: true,
            },
          },
          UserType: {
            select: {
              id: true,
              name: true,
            },
          },
          UserPermission: {
            select: {
              user_permission_id: true,
              module_id: true,
              active: true,
              Modules: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        distinct: ["username"],
      });
      return result;
    } catch (error) {
      console.error("Error listUsers:", error);
      throw new Error("An error occurred while listing Users");
    }
  }

  static async createUser(userData) {
    try {
      const checkUsedUsernameOrMail = await prisma.user.findMany({
        where: {
          OR: [{ username: userData.username }, { email: userData.email }],
        },
      });
      if (checkUsedUsernameOrMail) {
        throw new Error("Username o Mail en uso");
      }

      const hashedPassword = md5(userData.password);
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
          company_id: userData.company_id,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      for (const permission of userData.permissions) {
        const result3 = await prisma.UserPermission.create({
          data: {
            user_id: result.id,
            module_id: permission.module_id,
            active: permission.active,
          },
        });
      }

      return result;
    } catch (error) {
      console.error("Error createUser:", error);
      throw new Error("An error occurred while creating the user");
    }
  }
  static async createUserContratos(userData) {
    try {
      const checkUsedUsernameOrMail = await prisma.user.findMany({
        where: {
          OR: [{ username: userData.username }, { email: userData.email }],
        },
      });
      if (checkUsedUsernameOrMail) {
        throw new Error("Username o Mail en uso");
      }

      const hashedPassword = md5(userData.password);
      const result = await prisma.user.create({
        data: {
          username: userData.username,
          password: hashedPassword,
          user_type: Number(userData.user_type),
          reports_to: userData.reports_to,
          names: userData.names,
          lastname: userData.lastname,
          email: userData.email,
          active: userData.active,
          company_id: userData.company_id,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      for (const permission of userData.permissions) {
        const result3 = await prisma.UserPermission.create({
          data: {
            user_id: result.id,
            module_id: permission.module_id,
            active: permission.active,
          },
        });
      }
      return result;
    } catch (error) {
      console.error("Error createUser:", error);
      throw new Error("An error occurred while creating the user");
    }
  }

  static async updateUser(userData) {
    try {
      if (userData.password == undefined || userData.password == null) {
        const result = await prisma.user.update({
          where: { id: userData.id },
          data: {
            username: userData.username,
            active: userData.active,
            user_type: userData.user_type,
            reports_to: userData.reports_to,
            names: userData.names,
            lastname: userData.lastname,
            status: userData.status,
            email: userData.email,
            company_id: userData.company_id,
            updated_At: new Date(),
          },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.id,
            },
            data: {
              active: permission.active,
            },
          });
        }
        return result;
      } else {
        const hashedPassword = md5(userData.password);
        const result = await prisma.user.update({
          where: { id: userData.id },
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
            company_id: userData.company_id,
            updated_At: new Date(),
          },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.id,
            },
            data: {
              active: permission.active,
            },
          });
        }
        return result;
      }
    } catch (error) {
      console.error("Error updateUser:", error);
      throw new Error("An error occurred while updating the user");
    }
  }

  static async updateUserContratos(userData) {
    try {
      if (userData.password == undefined || userData.password == null) {
        const result = await prisma.user.update({
          where: { id: userData.id },
          data: {
            username: userData.username,
            password: hashedPassword,
            user_type: Number(userData.user_type),
            reports_to: userData.reports_to,
            names: userData.names,
            lastname: userData.lastname,
            email: userData.email,
            active: userData.active,
            company_id: userData.company_id,
            updated_At: new Date(),
          },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.id,
            },
            data: {
              active: permission.active,
            },
          });
        }
        return result;
      } else {
        const hashedPassword = md5(userData.password);
        const result = await prisma.user.update({
          where: { id: userData.id },
          data: {
            username: userData.username,
            password: hashedPassword,
            user_type: Number(userData.user_type),
            active: userData.active,
            reports_to: userData.reports_to,
            names: userData.names,
            lastname: userData.lastname,
            email: userData.email,
            company_id: userData.company_id,
            updated_At: new Date(),
          },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.id,
            },
            data: {
              module_id: permission.module_id,
              active: permission.active,
            },
          });
        }
        return result;
      }
    } catch (error) {
      console.error("Error updateUser:", error);
      throw new Error("An error occurred while updating the user");
    }
  }

  static async getUserPermissions(userID) {
    try {
      const result = await prisma.UserPermission.findMany({
        select: {
          module_id: true,
          active: true,
          Modules: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          user_id: userID,
        },
      });

      return result;
    } catch (error) {
      console.error("Error listUsers:", error);
      throw new Error("An error occurred while listing Users");
    }
  }
}
