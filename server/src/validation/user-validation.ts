import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly Register: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    role: z.enum(['ADMIN', 'HRD', 'EMPLOYEE', 'MANAGER']),
    employee_id: z.number().optional(),
  });

  static readonly Login: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly UpdateUser: ZodType = z.object({
    username: z.string().max(100).optional(),
    password: z.string().max(100).optional(),
    role: z.enum(['ADMIN', 'HRD', 'EMPLOYEE', 'MANAGER']).optional(),
    employee_id: z.number().optional(),
  });
}
