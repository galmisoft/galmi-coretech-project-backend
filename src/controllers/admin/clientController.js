import { ClientService } from '../../services/admin/clientService.js';

export class ClientController {
  static async listClients(req, res, next) {
    try {
      const { companyID } = req.body;
      const clients = await ClientService.listClients(companyID);
      return res.status(200).json({ clients });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }

  static async createClient(req, res, next) {
    try {
      const clientData = req.body;
      const client = await ClientService.createClient(clientData);
      return res.status(201).json({ client });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }

  static async updateClient(req, res, next) {
    try {
      const clientData = req.body;
      const client = await ClientService.updateClient(clientData);
      return res.status(200).json({ client });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }

  static async deleteClient(req, res, next) {
    try {
      const { id } = req.body
      const client = await ClientService.deleteClient(id);
      return res.status(200).json({ client });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}

