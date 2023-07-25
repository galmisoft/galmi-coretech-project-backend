import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CompanyService {
  static async listCompanies(companyName) {
    try {
        const listCompanies = prisma.company.findMany({
            where: {
                name: { contains: companyName === undefined ? "" : companyName } 
            },
            distinct: ['name']
        })
      return listCompanies;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to listCompanies');
    }
  }
  static async createCompany(companyData) {
    try {
      const company = await prisma.company.create({
        data: {
          name: companyData.name,
          active: companyData.active,
          visible_name: companyData.visible_name,
          country_id: companyData.country_id,
          division: companyData.division,
          sub_division: companyData.sub_division,
          zone: companyData.zone,
          sub_zone: companyData.sub_zone,
          canAddFluids: companyData.canAddFluids,
          canAddSteel: companyData.canAddSteel,
          canAddActivities: companyData.canAddActivities,
          contact_name: companyData.contact_name,
          contact_email: companyData.contact_email,
          contact_phone: companyData.contact_phone,
          number_users_admin: companyData.number_users_admin,
          number_users_supervisor: companyData.number_users_supervisor,
          number_users_leader: companyData.number_users_leader,
          number_users_perforist: companyData.number_users_perforist,
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
  static async updateCompany(companyData) {
    try {
      const company = await prisma.company.update({
        where: { id: companyData.id },
        data: {
          name: companyData.name,
          active: companyData.active,
          visible_name: companyData.visible_name,
          country_id: companyData.country_id,
          division: companyData.division,
          sub_division: companyData.sub_division,
          zone: companyData.zone,
          sub_zone: companyData.sub_zone,
          canAddFluids: companyData.canAddFluids,
          canAddSteel: companyData.canAddSteel,
          canAddActivities: companyData.canAddActivities,
          contact_name: companyData.contact_name,
          contact_email: companyData.contact_email,
          contact_phone: companyData.contact_phone,
          number_users_admin: companyData.number_users_admin,
          number_users_supervisor: companyData.number_users_supervisor,
          number_users_leader: companyData.number_users_leader,
          number_users_perforist: companyData.number_users_perforist,
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
