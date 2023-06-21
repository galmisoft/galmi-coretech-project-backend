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
}