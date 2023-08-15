import { ProjectService } from '../../services/admin/projectService.js';

export class ProjectController {
  static async listProject(req, res, next) {
    try {
      const { defaultCompanyID, companyID } = req.body;
      const Projects = await ProjectService.listProjects(defaultCompanyID, companyID);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createProject(req, res, next) {
    try {
      const ProjectModel = req.body;
      const Projects = await ProjectService.createProject(ProjectModel);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateProject(req, res, next) {
    try {
      const ProjectModel = req.body;
      const Projects = await ProjectService.updateProject(ProjectModel);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteProject(req, res, next) {
    try {
      const { id } = req.body;
      const Projects = await ProjectService.deleteProject(id);
      return res.status(200).json({ Projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}