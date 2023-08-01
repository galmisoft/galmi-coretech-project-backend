import { AssignationService } from '../../services/admin/assignationService.js';

export class AssignationController {
  static async listAssignation(req, res, next) {
    try {
      const { companyID, clientName } = req.body;
      const Assignations = await AssignationService.listAssignations(companyID, clientName);
      return res.status(200).json({ Assignations });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createAssignation(req, res, next) {
    try {
      const AssignationModel = req.body;
      const Assignations = await AssignationService.createAssignation(AssignationModel);
      return res.status(200).json({ Assignations });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateAssignation(req, res, next) {
    try {
      const AssignationModel = req.body;
      const Assignations = await AssignationService.updateAssignation(AssignationModel);
      return res.status(200).json({ Assignations });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteAssignation(req, res, next) {
    try {
      const { id } = req.body;
      const Assignations = await AssignationService.deleteAssignation(id);
      return res.status(200).json({ Assignations });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}