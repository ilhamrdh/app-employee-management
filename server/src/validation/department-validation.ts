import { z, ZodType } from 'zod';

export class DepartmentValidation {
  static readonly CreateDepartment: ZodType = z.object({
    name: z.string().min(1).max(100),
  });

  static readonly UpdateDepartment: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().max(100).optional(),
  });

  static readonly CreateDepartmentHistory: ZodType = z.object({
    department_id: z.number(),
    changed_by: z.string().min(1).max(100),
    old_name: z.string().min(1).max(100),
    new_name: z.string().min(1).max(100),
  });
}
