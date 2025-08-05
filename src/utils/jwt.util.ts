import { JWT_EXPIRES_IN, JWT_SECRET } from '@/config/env';
import jwt from 'jsonwebtoken';

export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
