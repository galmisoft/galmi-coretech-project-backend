import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ComboService {
  static async listProbes(companyID, defaultCompanyID) {
    try {
      const result = await prisma.probe.findMany({
        select: {
          id: true,
          probe_number: true,
        },
        where: {
          OR: [
            { DayPart: { every: { CompanydayPart: { every: { company_id: companyID } } } } },
            { DayPart: { every: { CompanydayPart: { every: { company_id: defaultCompanyID } } } } }
          ]
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listProbes");
    }
  }

  static async listTerrainTypes() {
    try {
      const result = await prisma.terrainType.findMany({
        select: {
          id: true,
          terrain_name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listTerrainTypes");
    }
  }

  static async listPositions() {
    try {
      const result = await prisma.position.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listPositions");
    }
  }

  static async listCompanies() {
    try {
      const result = await prisma.company.findMany({
        select: {
          id: true,
          visible_name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listCompanies");
    }
  }

  static async listUsersEmails(companyID, defaultCompanyID) {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        },
        where: {
          OR: [
            { CompanyUser: { every: { company_id: companyID } } },
            { CompanyUser: { every: { company_id: defaultCompanyID } } },
          ]
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listUsersEmails");
    }
  }

  static async listModules() {
    try {
      const result = await prisma.modules.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listModules");
    }
  }

  static async listCountries() { 
    try {
      const result = await prisma.country.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listCountries");
    }
  }

  static async listClients(companyID, defaultCompanyID) {
    try {
      const result = await prisma.client.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          OR: [
            { company_id: companyID },
            { company_id: defaultCompanyID }
          ]
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listClients");
    }
  }

  static async listProjects(companyID, defaultCompanyID) {
    try {
      const result = await prisma.project.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          OR: [
            { Client: { company_id: companyID } },
            { Client: { company_id: defaultCompanyID } },
          ]
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listProjects");
    }
  }

  static async listEquipment(companyID, defaultCompanyID) {
    try {
      const result = await prisma.equipment.findMany({
        select: {
          id: true,
          internal_code: true,
        },
        where: {
          OR: [
            { Client: { company_id: companyID } },
            { Client: { company_id: defaultCompanyID } },
          ]
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listTeams");
    }
  }

  static async listUsers(companyID, defaultCompanyID) {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          names: true,
        },
        where: {
          OR: [
            { CompanyUser: { company_id: companyID } },
            { CompanyUser: { company_id: defaultCompanyID } },
          ]
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listUsers");
    }
  }

  static async listUsersCoretech() {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          names: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listUsers");
    }
  }

  static async listProductTypes() {
    try {
      const result = await prisma.productType.findMany({
        select: {
          id: true,
          category_name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listProductTypes");
    }
  }

  static async listMeasures() {
    try {
      const result = await prisma.meassure.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listMeasures");
    }
  }

  static async listProducts(companyID, defaultCompanyID) {
    try {
      const result = await prisma.product.findMany({
        select: {
          id: true,
          description: true,
        },
        where: {
          OR: [
            { company_id: companyID },
            { company_id: defaultCompanyID },
          ]
        }
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listProducts");
    }
  }

  static async listLines() {
    try {
      const result = await prisma.line.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listLines");
    }
  }

  static async listProductSerialNumbers(companyID, defaultCompanyID) {
    try {
      const items = await prisma.Items.findMany({
        where: {
          OR: [
            { Client: { company_id: companyID } },
            { Client: { company_id: defaultCompanyID } }
          ]
        }
      }) 
      const usedSerialNumbers = items.map( (i) => i.dayPartProduct_serial_number )
      const result = await prisma.DayPartProducts.findMany({
        select: {
          serial_number: true,
        },
        where: {
          AND: [
            { DayPart: { every: { CompanydayPart: { every: { company_id: companyID } } } } },
            { DayPart: { every: { CompanydayPart: { every: { company_id: defaultCompanyID } } } } },
            { NOT: { serial_number: { in: usedSerialNumbers } } }
          ]
        },
        distinct: ['serial_number'],
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listProductSerialNumbers");
    }
  }

  static async listActivityTypes() {
    try {
      const result = await prisma.activityType.findMany({
        select: {
          id: true,
          name: true,
          activityType: {
            select: {
              id: true,
              name: true
            }
          }
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listActivityTypes");
    }
  }

  static async listDocumentTypes() {
    try {
      const result = await prisma.dniType.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listDocumentTypes");
    }
  }

  static async listMailTypes() {
    try {
      const result = await prisma.mailType.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listMailTypes");
    }
  }
  static async listUserTypes() {
    try {
      const result = await prisma.userType.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred in listUserTypes");
    }
  }
}
