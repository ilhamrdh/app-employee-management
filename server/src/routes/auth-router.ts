import express from 'express';
import { UserController } from '../controllers/user-controller';

export const authRouter = express.Router();

authRouter.post('/auth/register', UserController.register);
authRouter.post('/auth/login', UserController.login);
authRouter.get('/auth/refresh-token', UserController.refreshToken);
