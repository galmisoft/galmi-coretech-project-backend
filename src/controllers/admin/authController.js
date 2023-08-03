export class AuthController {
  static validateToken(req, res, next) {
    try {
      const token = UserService.validateToken(req);
      req.user = token;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}