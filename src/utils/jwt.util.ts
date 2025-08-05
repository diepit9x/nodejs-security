import { JWT_EXPIRES_IN, JWT_SECRET } from '@/config/env';
import { JwtPayload } from '@/types/jwt.payload.type';
import jwt from 'jsonwebtoken';

export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
