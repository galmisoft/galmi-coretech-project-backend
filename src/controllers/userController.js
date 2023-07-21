import { UserService } from '../services/userService.js';
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

  static async createUser(req, res, next) {
    try {
      const { UserModel } = req.query;
      const Users = await UserService.createUser({ userData });
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async updateUser(req, res, next) {
    try {
      const { UserModel } = req.query;
      const Users = await UserService.updateUser({ userData });
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { UserID } = req.query;
      const Users = await UserService.deleteUser({ UserID });
      return res.status(200).json({ Users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}