import { CompanyService } from '../../services/admin/companyService.js';

export class CompanyController {
  static async listCompanies(req, res, next) {
    try {
      const companyModel = req.body;
      const Companies = await CompanyService.listCompanies(companyModel);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async listCompanyContratos(req, res, next) {
    try {
      const companyModel = req.body;
      const Companies = await CompanyService.listCompaniesContratos(companyModel);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createCompany(req, res, next) {
    try {
      const CompanyModel = req.body;
      const Companies = await CompanyService.createCompany(CompanyModel);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateCompany(req, res, next) {
    try {
      const CompanyModel = req.body;
      const Companies = await CompanyService.updateCompany(CompanyModel);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteCompany(req, res, next) {
    try {
      const { id } = req.body;
      const Companies = await CompanyService.deleteCompany(id);
      return res.status(200).json({ Companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}
