import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ComboService {
  static async listProbes() {
    try{
      const result = await prisma.probe.findMany({
        select: {
          id: true,
          zone: true
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listProbes')
    }
  }

  static async listTerrainTypes() {
    try{
      const result = await prisma.terrainType.findMany({
        select: {
          id: true,
          terrain_name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listTerrainTypes')
    }
  }

  static async listPositions() {
    try{
      const result = await prisma.position.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listPositions')
    }
  }

  static async listCompanies() {
    try{
      const result = await prisma.company.findMany({
        select: {
          id: true,
          visible_name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listCompanies')
    }
  }

  static async listUsersEmails() {
    try{
      const result = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listUsersEmails')
    }
  }

  static async listModules() {
    try{
      const result = await prisma.modules.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listModules')
    }
  }

  static async listCountries() {
    try{
      const result = await prisma.country.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listCountries')
    }
  }

  static async listClients() {
    try{
      const result = await prisma.client.findMany({
        select: {
          id: true,
          comercial_name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listClients')
    }
  }

  static async listProjects() {
    try{
      const result = await prisma.project.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listProjects')
    }
  }

  static async listTeams() {
    try{
      const result = await prisma.team.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listTeams')
    }
  }

  static async listUsers() {
    try{
      const result = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listUsers')
    }
  }

  static async listProductTypes() {
    try{
      const result = await prisma.productType.findMany({
        select: {
          id: true,
          category_name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listProductTypes')
    }
  }

  static async listMeasures() {
    try{
      const result = await prisma.meassure.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listMeasures')
    }
  }

  static async listProducts() {
    try{
      const result = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listProducts')
    }
  }

  static async listLines() {
    try{
      const result = await prisma.line.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listLines')
    }
  }

  static async listProductSerialNumbers() {
    try{
      const result = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          serial_number: true,
        },
    });
    return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listProductSerialNumbers')
    }
  }

  static async listActivityTypes() {
    try{
      const result = await prisma.activityType.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listActivityTypes')
    }
  }

  static async listDocumentTypes() {
    try{
      const result = await prisma.dniType.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listDocumentTypes')
    }
  }

  static async listMailTypes() {
    try{
      const result = await prisma.mailType.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return result
    } catch(error){
      console.log(error)
      throw new Error('An error occurred in listMailTypes')
    }
  }
}
