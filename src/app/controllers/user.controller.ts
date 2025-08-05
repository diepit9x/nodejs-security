import { Request, Response, NextFunction } from 'express';
import * as userService from '@/app/services/user.service';
import { RegisterRequest } from '../dtos/requests/register.request';
import { plainToInstance } from 'class-transformer';
import { LoginRequest } from '../dtos/requests/login.request';
import { AuthenticatedRequest } from '@/types/authenticated.request.type';
import { JwtPayload } from '@/types/jwt.payload.type';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.ok('Lấy danh sách người dùng thành công', users);
};

export const createUser = async (req: Request, res: Response) => {
  const registerRequest = plainToInstance(RegisterRequest, req.body);
  const user = await userService.createUser(registerRequest);
  return res.ok('Đăng ký thành công', user);
};

export const generateToken = async (req: Request, res: Response) => {
  const loginRequest = plainToInstance(LoginRequest, req.body);
  const accessToken = await userService.generateToken(loginRequest);
  return res.ok('Tạo token thành công', accessToken);
};

export const userInfo = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.principal) {
    return res.fail('Token không hợp lệ', 401);
  }
  const principal: JwtPayload = req.principal;
  const user = await userService.userInfo(principal);
  return res.ok('Lấy thông tin thành công', user);
};
