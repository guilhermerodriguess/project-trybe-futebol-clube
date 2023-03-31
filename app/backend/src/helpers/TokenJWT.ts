import { SignOptions, sign, verify } from 'jsonwebtoken';
import Token from '../interfaces/Token';

const secret = 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data: Token) => sign({ data }, secret, jwtConfig);

const verifyToken = (token: string) => verify(token, secret);

const TokenJWT = { createToken, verifyToken };

export default TokenJWT;
