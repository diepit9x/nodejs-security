import db from '@/database';
import AppError from '@/utils/app.error';
import { RegisterRequest } from '@/app/dtos/requests/register.request';
import { User } from '@/database/models/user.model';
import { UserResponse } from '@/app/dtos/responses/user.response';
import { plainToInstance } from 'class-transformer';
import { comparePassword, hashPassword } from '@/utils/password.util';
import { LoginRequest } from '../dtos/requests/login.request';
import { signToken } from '@/utils/jwt.util';
import { JwtPayload } from '@/types/jwt.payload.type';

const getAllUsers = async () => {
  return await db.User.findAll();
};

const getUserByEmail = async (email: string) => {
  return await db.User.findOne({
    where: { email },
  });
};

const createUser = async (registerRequest: RegisterRequest) => {
  const existingUser: User = await getUserByEmail(registerRequest.email);
  if (existingUser) {
    throw new AppError('Email đã được đăng ký trong hệ thống', 400);
  }

  const hashedPassword = await hashPassword(registerRequest.password);

  const newUser: User = await User.create({
    email: registerRequest.email,
    name: registerRequest.name,
    password: hashedPassword,
  });

  const dto = plainToInstance(UserResponse, newUser, {
    excludeExtraneousValues: true,
  });

  return dto;
};

const generateToken = async (loginRequest: LoginRequest) => {
  const email: string = loginRequest.email;
  const password: string = loginRequest.password;

  const existingUser: User = await db.User.findOne({ where: { email } });

  if (!existingUser) {
    throw new AppError('Thông tin đăng nhập không chính xác', 400);
  }

  const isMatch = await comparePassword(password, existingUser.password);
  if (!isMatch) {
    throw new AppError('Thông tin đăng nhập không chính xác', 400);
  }

  const payload: JwtPayload = {
    email: existingUser.email,
    role: existingUser.role,
  };
  return signToken(payload);
};

const userInfo = async (principal: JwtPayload) => {
  const existingUser = getUserByEmail(principal.email);
  if (!existingUser) {
    throw new AppError('User không tồn tại');
  }
  const dto = plainToInstance(UserResponse, existingUser, {
    excludeExtraneousValues: true,
  });
  return dto;
};

export { getAllUsers, getUserByEmail, createUser, generateToken, userInfo };
