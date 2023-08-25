import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CompanyService {
  static async listCompanies(companyModel) {
    try {
      const listCompanies = prisma.company.findMany({
        select: {
          id: true,
          name: true,
          created_At: true,
          contact_name: true,
          contact_email: true,
          country_id: true,
          active: true,
          Country: {
            select: {
              name: true,
            }
          }
        },
        distinct: ['name']
      })
      return listCompanies;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to listCompanies');
    }
  }
  static async listCompaniesContratos(companyModel) {
    try {
      const listCompanies = await prisma.company.findUnique({
        select: {
          id: true,
          visible_name: true,
          visible_icon: true,
          visible_logo1: true,
          visible_logo2: true
        },
        where: {
          id: companyModel.companyID
        }
      })
      return listCompanies;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to listCompanies');
    }
  }

  static async updateCompanyContratos(companyModel, visible_icon, visible_logo1, visible_logo2) {
    try {
      const listCompanies = await prisma.company.update({
        where: {
          id: companyModel.companyID
        },
        data: {
          visible_name: companyModel.visible_name,
          visible_icon: visible_icon ? visible_icon[0].buffer : null,
          visible_logo1: visible_logo1 ? visible_logo1[0].buffer : null,
          visible_logo2: visible_logo2 ? visible_logo2[0].buffer : null
        }
      })
      return listCompanies;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to listCompanies');
    }
  }

  static async createCompany(companyModel) {
    try {
      const company = await prisma.company.create({
        data: {
          name: companyModel.name,
          active: companyModel.active,
          visible_name: companyModel.visible_name,
          country_id: companyModel.country_id,
          division: companyModel.division,
          sub_division: companyModel.sub_division,
          zone: companyModel.zone,
          sub_zone: companyModel.sub_zone,
          canAddFluids: companyModel.canAddFluids,
          canAddSteel: companyModel.canAddSteel,
          canAddActivities: companyModel.canAddActivities,
          contact_name: companyModel.contact_name,
          contact_email: companyModel.contact_email,
          contact_phone: companyModel.contact_phone,
          number_users_admin: companyModel.number_users_admin,
          number_users_supervisor: companyModel.number_users_supervisor,
          number_users_leader: companyModel.number_users_leader,
          number_users_perforist: companyModel.number_users_perforist,
          created_At: new Date(),
          updated_At: new Date()
        }
      });
      return company;
    } catch (error) {
      console.log(error)
      throw new Error('An error occurred while creating the company')
    }
  }
  static async updateCompany(companyModel) {
    try {
      const company = await prisma.company.update({
        where: { id: companyModel.id },
        data: {
          name: companyModel.name,
          active: companyModel.active,
          visible_name: companyModel.visible_name,
          country_id: companyModel.country_id,
          division: companyModel.division,
          sub_division: companyModel.sub_division,
          zone: companyModel.zone,
          sub_zone: companyModel.sub_zone,
          canAddFluids: companyModel.canAddFluids,
          canAddSteel: companyModel.canAddSteel,
          canAddActivities: companyModel.canAddActivities,
          contact_name: companyModel.contact_name,
          contact_email: companyModel.contact_email,
          contact_phone: companyModel.contact_phone,
          number_users_admin: companyModel.number_users_admin,
          number_users_supervisor: companyModel.number_users_supervisor,
          number_users_leader: companyModel.number_users_leader,
          number_users_perforist: companyModel.number_users_perforist,
          updated_At: new Date()
        }
      });
      return company;
    } catch (error) {
      console.error('Error updating company:', error);
      console.log(error)
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
      console.log(error)
      throw new Error('An error occurred while deleting the company');
    }
  }
  static async createCompanydayPart(companyId, dayPartId) {
    try {
      const companydayPart = await prisma.companydayPart.create({
        data: {
          company_id: companyId,
          dayPart_id: dayPartId,
        },
      });
      return companydayPart;
    } catch (error) {
      console.log(error)
      throw new Error(`Error creating companydayPart`);
    }
  }


}
