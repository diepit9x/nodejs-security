import express from 'express';
import {
  getAllUsers,
  createUser,
  generateToken,
  userInfo,
} from '@/app/controllers/user.controller';
import validateRequest from '@/middlewares/validate.request';
import { RegisterRequest } from '@/app/dtos/requests/register.request';
import { LoginRequest } from '@/app/dtos/requests/login.request';
import { authenticateJWT } from '@/middlewares/authenticate.jwt';
import { authorizeRole } from '@/middlewares/authorize.role';

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/', validateRequest(RegisterRequest), createUser);
userRoutes.post(
  '/generate-token',
  validateRequest(LoginRequest),
  generateToken
);

userRoutes.get('/user-info', authenticateJWT, authorizeRole('user'), userInfo);

export default userRoutes;
