import { z, ZodType } from 'zod';

export class EmployeeValidation {
  static readonly CreateEmployee: ZodType = z.object({
    name: z.string().min(1).max(100),
    position: z.string().min(1).max(100),
    salary: z.number(),
    department_id: z.number(),
  });

  static readonly UpdateNameEmployee: ZodType = z.object({
    name: z.string().min(1).max(100),
  });

  static readonly UpdateEmployee: ZodType = z.object({
    id: z.number(),
    position: z.string().max(100).optional(),
    salary: z.number().optional(),
    department_id: z.number().optional(),
  });

  static readonly CreateEmployeeHistory: ZodType = z.object({
    employee_id: z.number(),
    changed_by: z.string().min(1).max(100),
    changed_type: z.string().min(1).max(10),
    old_position: z.string().min(1).max(100),
    old_salary: z.number(),
    old_department_id: z.number(),
    new_position: z.string().min(1).max(100),
    new_salary: z.number(),
    new_department_id: z.number(),
  });

  static readonly SearchEmployeeHistory: ZodType = z.object({
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).positive(),
  });

  static readonly SearchEmployee: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    position: z.string().min(1).max(100).optional(),
    salary_sort: z.string().optional(),
    salary_min: z.number().optional(),
    salary_max: z.number().optional(),
    department_id: z.number().positive().optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).positive(),
  });
}
