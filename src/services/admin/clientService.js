import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ClientService {
  static async listClients(companyID) {
    try {
      const clients = await prisma.client.findMany({
        where: {
          AND: [
            {
              OR: [
                { company_id: companyID },
              ],
            },
          ],
        },
        include: {
          Country: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return clients;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to list clients');
    }
  }

  static async createClient(clientData) {
    try {
      const client = await prisma.client.create({
        data: {
          name: clientData.name,
          comercial_name: clientData.comercial_name,
          country_id: clientData.country_id,
          company_id: clientData.company_id,
          active: clientData.active,
          created_At: new Date(),
          updated_At: new Date()
        },
      });
      return client;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to create client');
    }
  }
  static async updateClient(clientData) {
    try {
      const client = await prisma.client.update({
        where: {
          id: clientData.id,
        },
        data: {
          comercial_name: clientData.comercial_name,
          country_id: clientData.country_id,
          company_id: clientData.company_id,
          active: clientData.active,
          updated_At: new Date()
        },
      });
      return client;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to update client');
    }
  }
  static async deleteClient(clientId) {
    try {
      const client = await prisma.client.delete({ where: { id: clientId } });
      return client;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to delete client');
    }
  }
}
