export const ROLE_HIERARCHY: Record<string, string[]> = {
  admin: ['manager', 'user'],
  manager: ['user'],
  user: [],
};

/**
 * Hàm kiểm tra role có quyền truy cập không, xét theo phân cấp
 */
export const hasRoleAccess = (
  userRole: string,
  requiredRole: string
): boolean => {
  if (userRole === requiredRole) return true;

  const lowerRoles = ROLE_HIERARCHY[userRole] || [];
  return lowerRoles.includes(requiredRole);
};
