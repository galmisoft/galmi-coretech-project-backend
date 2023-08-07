import jwt from 'jsonwebtoken';

export class JwtAuth {
  static sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}