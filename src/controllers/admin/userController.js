import { UserService } from '../../services/admin/userService.js';
export class UserController {
  static async validateUser(req, res , next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const token = await UserService.validateUser({ email, password });
    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.status(200).json({ email, token });
  }
  static async listUser(req, res, next) {
    try {
      const { username } = req.body;
      const Users = await UserService.listUsers(username);
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