import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = 'jwt_secret';

const tokenValidate = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Token not found' });
  try {
    jwt.verify(auth, secret);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidate;
