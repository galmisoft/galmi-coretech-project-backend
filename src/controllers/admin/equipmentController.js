import { EquipmentService } from '../../services/admin/equipmentService.js';

export class EquipmentController {
  static async listEquipment(req, res, next) {
    try {
      const { defaultCompanyID, companyID } = req.body;
      const Equipments = await EquipmentService.listEquipments(defaultCompanyID, companyID);
      return res.status(200).json({ Equipments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createEquipment(req, res, next) {
    try {
      const EquipmentModel = req.body;
      const Equipments = await EquipmentService.createEquipment(EquipmentModel);
      return res.status(200).json({ Equipments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateEquipment(req, res, next) {
    try {
      const EquipmentModel = req.body;
      const Equipments = await EquipmentService.updateEquipment(EquipmentModel);
      return res.status(200).json({ Equipments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteEquipment(req, res, next) {
    try {
      const { id } = req.body;
      const Equipments = await EquipmentService.deleteEquipment(id);
      return res.status(200).json({ Equipments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}