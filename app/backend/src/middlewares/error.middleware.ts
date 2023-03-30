import { NextFunction, Request, Response } from 'express';
import HTTPError from '../helpers/HTTPError';

const Error = (error: HTTPError, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = error;

  console.log({ message });

  res.status(status).json({ message });
};

export default Error;
