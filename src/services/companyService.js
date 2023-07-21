import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CompanyService {
  static async listCompanies(companyName) {
    try {
        const listCompanies = prisma.company.findMany({
            select: {
                name: true,
                createdAt: true,
                contact: true,
                country: true,
                status: true
            },
            where: {
                name: companyName === undefined ? true : companyName
            },
            distinct: ['name']
        })
      return listCompanies;
    } catch (error) {
      throw new Error('Failed to listCompanies');
    }
  }
  static async createCompany(companyData) {
    try {
      const company = await prisma.company.create({
        data: {
          name: companyData.name,
          active: companyData.active,
          country: companyData.country,
          division: companyData.division,
          subdivision: companyData.subdivision,
          zone: companyData.zone,
          subzone: companyData.subzone,
          canAddFluids: companyData.canAddFluids,
          canAddSteel: companyData.canAddSteel,
          canAddActivities: companyData.canAddActivities,
          active: companyData.active,
          CompanyUser: {
            full_name: companyData.Contact.full_name,
            email: companyData.Contact.email,
            phone: companyData.Contact.phone,
            // Falta acceso a roles para modulos
          },
        }
      });
      return company;
    } catch (error) {
      console.error('Error creating company:', error);
      throw new Error('An error occurred while creating the company')
    }
  }

  static async updateCompany(companyData) {
    try {
      const company = await prisma.company.update({
        where: { id: companyData.id },
        data: {
          name: companyData.name,
          active: companyData.active,
          country: companyData.country,
          division: companyData.division,
          subdivision: companyData.subdivision,
          zone: companyData.zone,
          subzone: companyData.subzone,
          canAddFluids: companyData.canAddFluids,
          canAddSteel: companyData.canAddSteel,
          canAddActivities: companyData.canAddActivities,
          active: companyData.active,
          CompanyUser: {
            full_name: companyData.Contact.full_name,
            email: companyData.Contact.email,
            phone: companyData.Contact.phone,
            // Falta acceso a roles para modulos
          },
        }
      });
      return company;
    } catch (error) {
      console.error('Error updating company:', error);
      throw new Error('An error occurred while updating the company');
    }
  }
  static async deleteCompany(companyID) {
    try {
      const company = await prisma.company.delete({
        where: { id: companyID }
      });
      return company;
    } catch (error) {
      console.error('Error deleting company:', error);
      throw new Error('An error occurred while deleting the company');
    }
  }
}
