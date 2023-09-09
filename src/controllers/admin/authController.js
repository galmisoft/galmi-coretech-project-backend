import { UserService } from "../../services/admin/userService.js";

export class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
      const token = await UserService.validateUser(username, password);
      if (!token) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.status(200).json({ access_token: token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", details: error.message });
    }
  }
  static validateToken(req, res, next) {
    try {
      const token = UserService.validateToken(req);
      req.user = token;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}
