import { Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/jwt.util';
import { AuthenticatedRequest } from '@/types/authenticated.request.type';

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.fail('Chưa đăng nhập', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.principal = decoded;
    next();
  } catch (err) {
    return res.fail('Token không hợp lệ hoặc đã hết hạn', 401);
  }
};
