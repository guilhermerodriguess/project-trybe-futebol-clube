import { Request } from 'express';
import Token from './Token';

export interface RequestCustom extends Request {
  data: Token;
}
