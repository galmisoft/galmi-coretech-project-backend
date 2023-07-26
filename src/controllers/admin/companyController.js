import { CompanyService } from '../../services/admin/companyService.js';

export class CompanyController {
  static async listCompanies(req, res, next) {
    try {
      const { CompanyName } = req.body;
      const Companies = await CompanyService.listCompanies(CompanyName);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async createCompany(req, res, next) {
    try {
      const CompanyModel = req.body;
      const Companies = await CompanyService.createCompany(CompanyModel);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async updateCompany(req, res, next) {
    try {
      const CompanyModel = req.body;
      const Companies = await CompanyService.updateCompany(CompanyModel);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async deleteCompany(req, res, next) {
    try {
      const { id } = req.body;
      const Companies = await CompanyService.deleteCompany(id);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
