import { Response, NextFunction } from 'express';
import { hasRoleAccess } from '@/config/role.hierarchy';
import { AuthenticatedRequest } from '@/types/authenticated.request.type';

export const authorizeRole = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.principal?.role;

    if (!userRole) {
      return res.fail('Chưa đăng nhập', 401);
    }

    if (!hasRoleAccess(userRole, requiredRole)) {
      return res.fail('Không có quyền truy cập', 403);
    }

    next();
  };
};
