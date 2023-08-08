import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class AssignationService {
  static async listAssignations(defaultCompanyID, companyID, activeProject) {
    try {
      const Assignations = await prisma.Assignation.findMany({
        where: {
          Client: {
            OR: [
              { company_id: companyID },
              { company_id: defaultCompanyID },
            ],
          },
          Project: {
            active: activeProject
          },
        },
        include: {
          Client: {
            select: {
              id: true,
              name: true
            }
          },
          Project: {
            select: {
              id: true,
              name: true,
              active: true
            }
          },
          Equipment: {
            select: {
              id: true,
              internal_code: true
            }
          },
          User: {
            select: {
              id: true,
              names: true
            }
          },
        }
      });
      return Assignations;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to list Assignations');
    }
  }
  static async createAssignation(AssignationData) {
    try {
      const Assignation = await prisma.Assignation.create({
        data: {
          client_id: AssignationData.client_id,
          project_id: AssignationData.project_id,
          equipment_id: AssignationData.equipment_id,
          user_id: AssignationData.user_id,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      return Assignation;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to create Assignation');
    }
  }
  static async updateAssignation(AssignationData) {
    try {
      const Assignation = await prisma.Assignation.update({
        where: {
          id: AssignationData.id,
        },
        data: {
          client_id: AssignationData.client_id,
          project_id: AssignationData.project_id,
          equipment_id: AssignationData.equipment_id,
          user_id: AssignationData.user_id,
          updated_At: new Date(),
        },
      });
      return Assignation;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to update Assignation');
    }
  }
  static async deleteAssignation(AssignationId) {
    try {
      const Assignation = await prisma.Assignation.delete({ where: { id: AssignationId } });
      return Assignation;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to delete Assignation');
    }
  }
}
