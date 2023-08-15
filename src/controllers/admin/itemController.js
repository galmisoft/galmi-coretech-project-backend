import { ItemsService } from '../../services/admin/itemService.js';

export class ItemController {
  static async listItems(req, res, next) {
    try {
      const { defaultCompanyID, companyID, productTypeID } = req.body;
      const Items = await ItemsService.listItems(defaultCompanyID, companyID, productTypeID);
      return res.status(200).json({ Items });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createItem(req, res, next) {
    try {
      const ItemModel = req.body;
      const Items = await ItemsService.createItem(ItemModel);
      return res.status(200).json({ Items });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateItem(req, res, next) {
    try {
      const ItemModel = req.body;
      const Items = await ItemsService.updateItem(ItemModel);
      return res.status(200).json({ Items });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteItem(req, res, next) {
    try {
      const { id } = req.body;
      const Items = await ItemsService.deleteItem(id);
      return res.status(200).json({ Items });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}
