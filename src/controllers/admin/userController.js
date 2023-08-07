import { UserService } from '../../services/admin/userService.js';
export class UserController {
  static async listUser(req, res, next) {
    try {
      const { defaultCompanyID, companyID } = req.body;
      const Users = await UserService.listUsers(defaultCompanyID, companyID);
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createUser(req, res, next) {
    try {
      const UserModel = req.body;
      const Users = await UserService.createUser(UserModel);
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateUser(req, res, next) {
    try {
      const UserModel = req.body;
      const Users = await UserService.updateUser(UserModel);
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.body;
      const Users = await UserService.deleteUser(id);
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}