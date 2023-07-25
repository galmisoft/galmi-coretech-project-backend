import { ProjectService } from '../services/projectService.js';

export class ProjectController {
  static async listProject(req, res, next) {
    try {
      const { companyID, projectName } = req.body;
      const Projects = await ProjectService.listProjects(companyID, projectName);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async createProject(req, res, next) {
    try {
      const ProjectModel = req.body;
      const Projects = await ProjectService.createProject(ProjectModel);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async updateProject(req, res, next) {
    try {
      const ProjectModel = req.body;
      const Projects = await ProjectService.updateProject(ProjectModel);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async deleteProject(req, res, next) {
    try {
      const { id } = req.body;
      const Projects = await ProjectService.deleteProject(id);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}