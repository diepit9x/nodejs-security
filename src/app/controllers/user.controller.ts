import { Request, Response, NextFunction } from 'express';
import * as userService from '@/app/services/user.service';
import { RegisterRequest } from '../dtos/requests/register.request';
import { plainToInstance } from 'class-transformer';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await userService.getAllUsers();
  return res.ok('Lấy danh sách người dùng thành công', users);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerRequest = plainToInstance(RegisterRequest, req.body);
  const users = await userService.createUser(registerRequest);
  return res.ok('Đăng ký thành công', users);
};
