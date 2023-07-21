const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export class ClientService {
  static async listClients() {
    try {
      const clients = await prisma.client.findMany();
      return clients;
    } catch (error) {
      throw new Error('Failed to list clients');
    }
  }
  static async createClient(clientData) {
    try {
      const client = await prisma.client.create({
        data: clientData,
      });
      return client;
    } catch (error) {
      throw new Error('Failed to create client');
    }
  }
  static async updateClient(clientId, clientData) {
    try {
      const client = await prisma.client.update({
        where: {
          id: clientId,
        },
        data: clientData,
      });
      return client;
    } catch (error) {
      throw new Error('Failed to update client');
    }
  }
  static async deleteClient(clientId) {
    try {
      const client = await prisma.client.delete({
        where: {
          id: clientId,
        },
      });
      return client;
    } catch (error) {
      throw new Error('Failed to delete client');
    }
  }
}
