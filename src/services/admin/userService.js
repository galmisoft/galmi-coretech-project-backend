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
            { password: hashedPassword },
            { OR: [{ username: username }, { email: username }] },
          ],
        },
        include: {
          TeamUser: {
            select: {
              Team: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          CompanyUser: {
            select: {
              Company: {
                select: {
                  id: true,
                  name: true,
                  visible_name: true,
                },
              },
            },
          },
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
                },
              },
            },
          },
          UserPermission: {
            select: {
              Permission: {
                select: {
                  module_id: true,
                  active: true,
                  Modules: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (result) {
        const defaultCompany = await prisma.company.findUnique({
          where: { id: "dd6eb56d-f8f4-4686-80b8-31a41062ea77" },
          select: {
            id: true,
            name: true,
            visible_name: true,
          },
        });
        result[0].DefaultCompany = defaultCompany;
        console.log(JSON.stringify(result, null, 2));
        return JwtAuth.sign(JSON.stringify({ result }));
      }
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
        where: {
          OR: [{ CompanyUser: { some: { company_id: companyID } } }],
        },
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
          email: true,
          status: true,
          reports_to: true,
          CompanyUser: {
            select: {
              Company: {
                select: {
                  id: true,
                  name: true,
                },
              },
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
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      const result2 = await prisma.companyUser.create({
        data: {
          company_id: userData.company_id,
          user_id: result.id,
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
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      const result2 = await prisma.companyUser.create({
        data: {
          company_id: userData.company_id,
          user_id: result.id,
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
            updated_At: new Date(),
          },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.user_permission_id,
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
            updated_At: new Date(),
          },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.user_permission_id,
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
            updated_At: new Date(),
          },
        });
        const result2 = await prisma.companyUser.updateMany({
          where: { user_id: result.id },
          data: { company_id: userData.company_id },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.user_permission_id,
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
            updated_At: new Date(),
          },
        });
        const result2 = await prisma.companyUser.updateMany({
          where: { user_id: result.id },
          data: { company_id: userData.company_id },
        });
        for (const permission of userData.permissions) {
          const result3 = await prisma.UserPermission.update({
            where: {
              user_permission_id: permission.user_permission_id,
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
