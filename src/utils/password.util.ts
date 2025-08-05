import { PEPPER, SALT_ROUNDS } from '@/config/env';
import bcrypt from 'bcrypt';

/**
 * Hash mật khẩu người dùng kèm theo pepper.
 * @param plain Mật khẩu người dùng nhập
 * @returns Mật khẩu đã được hash
 */
export const hashPassword = async (plain: string): Promise<string> => {
  const combined = plain + PEPPER;
  return await bcrypt.hash(combined, SALT_ROUNDS);
};

/**
 * So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong DB (đã có pepper).
 * @param plain Mật khẩu người dùng nhập
 * @param hashed Mật khẩu đã được hash và lưu trong DB
 * @returns true nếu mật khẩu đúng, false nếu sai
 */
export const comparePassword = async (
  plain: string,
  hashed: string
): Promise<boolean> => {
  const combined = plain + PEPPER;
  return await bcrypt.compare(combined, hashed);
};
