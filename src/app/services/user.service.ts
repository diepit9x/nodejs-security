import db from '@/database';
import AppError from '@/utils/app.error';
import { RegisterRequest } from '@/app/dtos/requests/register.request';
import { User } from '@/database/models/user.model';
import { UserResponse } from '@/app/dtos/responses/user.response';
import { plainToInstance } from 'class-transformer';
import { hashPassword } from '@/utils/password.util';

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
export { getAllUsers, getUserByEmail, createUser };
