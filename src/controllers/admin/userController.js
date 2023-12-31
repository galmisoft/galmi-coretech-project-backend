import { UserService } from '../../services/admin/userService.js';
export class UserController {
  static async listUser(req, res, next) {
    try {
      const Users = await UserService.listUsers();
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async listUserContratos(req, res, next) {
    try {
      const { companyID } = req.body;
      const Users = await UserService.listUsersContratos(companyID);
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
  static async createUserContratos(req, res, next) {
    try {
      const UserModel = req.body;
      const Users = await UserService.createUserContratos(UserModel);
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
  static async updateUserContratos(req, res, next) {
    try {
      const UserModel = req.body;
      const Users = await UserService.updateUserContratos(UserModel);
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

  static async getUserPermissions(req, res, next) {
    try {
      const { id } = req.body;
      const Users = await UserService.getUserPermissions(id);
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}