import { SignOptions, sign, verify } from 'jsonwebtoken';
import IUser from '../interfaces/User';

const secret = 'jwt_secret';

require('dotenv/config');

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data: IUser) => sign({ data }, secret, jwtConfig);

const verifyToken = (token: string) => verify(token, secret);

const TokenJWT = { createToken, verifyToken };

export default TokenJWT;
