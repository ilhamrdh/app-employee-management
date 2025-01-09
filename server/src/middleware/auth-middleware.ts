import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Token } from '../utils/token';
import { ROLE } from '../utils/constans';

export const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        message: 'Token not found or invalid format',
      });
      return;
    }

    const token = tokenHeader.split(' ')[1];

    const decode = Token.verifyAccessToken(token);
    (req as any).user = decode;
    return next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

export const authRoles = (roles: ROLE[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;

    if (!userRole || !roles.includes(userRole as ROLE)) {
      res.status(403).json({ message: 'Access denied: insufficient permissions' });
      return;
    }

    next();
  };
};
