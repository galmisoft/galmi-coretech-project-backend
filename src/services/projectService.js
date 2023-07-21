const { PrismaProject } = require('@prisma/Project');
const prisma = new PrismaProject();

export class ProjectService {
  static async listProjects() {
    try {
      const Projects = await prisma.Project.findMany();
      return Projects;
    } catch (error) {
      throw new Error('Failed to list Projects');
    }
  }
  static async createProject(ProjectData) {
    try {
      const Project = await prisma.Project.create({
        data: ProjectData,
      });
      return Project;
    } catch (error) {
      throw new Error('Failed to create Project');
    }
  }
  static async updateProject(ProjectId, ProjectData) {
    try {
      const Project = await prisma.Project.update({
        where: {
          id: ProjectId,
        },
        data: ProjectData,
      });
      return Project;
    } catch (error) {
      throw new Error('Failed to update Project');
    }
  }
  static async deleteProject(ProjectId) {
    try {
      const Project = await prisma.Project.delete({
        where: {
          id: ProjectId,
        },
      });
      return Project;
    } catch (error) {
      throw new Error('Failed to delete Project');
    }
  }
}
