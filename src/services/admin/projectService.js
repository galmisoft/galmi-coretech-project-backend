import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ProjectService {
  static async listProjects(companyID) {
    try {
      const Projects = await prisma.Project.findMany({
        where: {
          AND: [
            {
              OR: [
                { Client: { company_id: companyID } },
              ],
            },
          ],
        },
        include: {
          Client: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return Projects;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to list Projects');
    }
  }
  
  static async createProject(ProjectData) {
    try {
      const Project = await prisma.Project.create({
        data: {
          client_id: ProjectData.client_id,
          name: ProjectData.name,
          zone: ProjectData.zone,
          location: ProjectData.location,
          projected_cost_tools: ProjectData.projected_cost_tools,
          projected_cost_fluids: ProjectData.projected_cost_fluids,
          active: ProjectData.active,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      return Project;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to create Project');
    }
  }
  static async updateProject(ProjectData) {
    try {
      const Project = await prisma.Project.update({
        where: {
          id: ProjectData.id,
        },
        data: {
          client_id: ProjectData.client_id,
          name: ProjectData.name,
          zone: ProjectData.zone,
          location: ProjectData.location,
          projected_cost_tools: ProjectData.projected_cost_tools,
          projected_cost_fluids: ProjectData.projected_cost_fluids,
          active: ProjectData.active,
          updated_At: new Date(),
        },
      });
      return Project;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to update Project');
    }
  }
  static async deleteProject(ProjectId) {
    try {
      const Project = await prisma.Project.delete({ where: { id: ProjectId } });
      return Project;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to delete Project');
    }
  }
}
