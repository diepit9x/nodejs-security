import express from 'express';
import { getAllUsers, createUser } from '../app/controllers/user.controller';
import validateRequest from '@/middlewares/validate.request';
import { RegisterRequest } from '@/app/dtos/requests/register.request';

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/', validateRequest(RegisterRequest), createUser);

export default userRoutes;
