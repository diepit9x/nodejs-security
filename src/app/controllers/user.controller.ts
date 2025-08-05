import { Request, Response, NextFunction } from 'express';
import * as userService from '@/app/services/user.service';
import { RegisterRequest } from '../dtos/requests/register.request';
import { plainToInstance } from 'class-transformer';
import { LoginRequest } from '../dtos/requests/login.request';
import { verifyToken } from '@/utils/jwt.util';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.ok('Lấy danh sách người dùng thành công', users);
};

export const createUser = async (req: Request, res: Response) => {
  const registerRequest = plainToInstance(RegisterRequest, req.body);
  const users = await userService.createUser(registerRequest);
  return res.ok('Đăng ký thành công', users);
};

export const generateToken = async (req: Request, res: Response) => {
  const loginRequest = plainToInstance(LoginRequest, req.body);
  const users = await userService.generateToken(loginRequest);
  return res.ok('Tạo token thành công', users);
};

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.body;
  try {
    const payload = verifyToken(accessToken);
    return res.ok('Xác thực token', payload);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.error('Token đã hết hạn');
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.error('Token không hợp lệ');
    } else {
      console.error('Lỗi khi xác thực token:', err);
    }
    next(err);
  }
};
