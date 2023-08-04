import { PersonsService } from '../../services/admin/personService.js';

export class PersonController {
  static async listPersons(req, res, next) {
    try {
      const { companyId } = req.body;
      const Persons = await PersonsService.listPersons(companyId);
      return res.status(200).json({ Persons });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createPerson(req, res, next) {
    try {
      const PersonModel = req.body;
      const Persons = await PersonsService.createPerson(PersonModel);
      return res.status(200).json({ Persons });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updatePerson(req, res, next) {
    try {
      const PersonModel = req.body;
      const Persons = await PersonsService.updatePerson(PersonModel);
      return res.status(200).json({ Persons });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deletePerson(req, res, next) {
    try {
      const { id } = req.body;
      const Persons = await PersonsService.deletePerson(id);
      return res.status(200).json({ Persons });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async toggleActive(req, res, next) {
    try {
      const { id } = req.body;
      const Persons = await PersonsService.toggleAvailable(id);
      return res.status(200).json({ Persons });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}
