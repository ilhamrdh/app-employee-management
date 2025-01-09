import { NextFunction, Request, Response } from 'express';
import { LoginRequest, RegisterRequest } from '../models/user-model';
import { UserService } from '../services/user-service';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      const response = await UserService.register(request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body;
      const response = await UserService.login(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;
    try {
      const response = await UserService.refreshToken(refreshToken);
      res.status(200).json({
        data: {
          access_token: response,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
