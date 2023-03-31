import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/User';
import HTTPError from '../helpers/HTTPError';
import User from '../database/models/User';
import TokenJWT from '../helpers/TokenJWT';
import ValidateToken from '../interfaces/ValidateToken';

export default class UserService {
  static async login(req: Request) {
    const { email, password } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const message = 'Invalid email or password';

    if (!email || !password) throw new HTTPError(400, 'All fields must be filled');
    if (!regex.test(email) || password.length < 6) throw new HTTPError(401, message);

    const result = await User.findOne({ where: { email } });
    if (result === null) throw new HTTPError(401, message);
    const checkPassword = await bcrypt.compare(password, result.password);

    if (!checkPassword) throw new HTTPError(401, message);

    const { username, role } = result;
    const token = TokenJWT.createToken({ username, role, email });

    return { status: 200, token };
  }

  static async validateToken(req: Request, _res: Response, _next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new HTTPError(401, 'Token not found');

    let decoded;
    try {
      decoded = TokenJWT.verifyToken(authorization) as ValidateToken;
    } catch (err) {
      throw new HTTPError(401, 'Token must be a valid token');
    }

    const { email } = decoded.data;
    const data = await User.findOne({ where: { email } });

    const { role } = data as IUser;

    return { status: 200, role };
  }
}
