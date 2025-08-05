import express from 'express';
import {
  getAllUsers,
  createUser,
  generateToken,
  verifyAccessToken,
} from '@/app/controllers/user.controller';
import validateRequest from '@/middlewares/validate.request';
import { RegisterRequest } from '@/app/dtos/requests/register.request';
import { LoginRequest } from '@/app/dtos/requests/login.request';

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/', validateRequest(RegisterRequest), createUser);
userRoutes.post(
  '/generate-token',
  validateRequest(LoginRequest),
  generateToken
);
userRoutes.post('/verify-token', verifyAccessToken);

export default userRoutes;
