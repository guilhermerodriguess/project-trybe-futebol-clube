import { NextFunction, Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { status, token } = await UserService.login(req);

    return res.status(status).json({ token });
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const { status, role } = await UserService.validateToken(req, res, next);

    return res.status(status).json({ role });
  }
}
