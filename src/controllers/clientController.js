import ClientService from '../services/clientService';

export class ClientController {
  static async listClients(req, res, next) {
    try {
      const clients = await ClientService.listClients();
      return res.status(200).json({ clients });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createClient(req, res, next) {
    try {
      const clientData = req.body;
      const client = await ClientService.createClient(clientData);
      return res.status(201).json({ client });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateClient(req, res, next) {
    try {
      const clientId = req.params.id;
      const clientData = req.body;
      const client = await ClientService.updateClient(clientId, clientData);
      return res.status(200).json({ client });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteClient(req, res, next) {
    try {
      const clientId = req.params.id;
      const client = await ClientService.deleteClient(clientId);
      return res.status(200).json({ client });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

