import { NextFunction, Request, Response } from 'express';
import {
  EmployeeCreateRequest,
  EmployeeUpdateRequest,
  SearchEmployeeHistoryRequest,
  SearchEmployeeRequest,
} from '../models/employee-model';
import { EmployeeService } from '../services/employee-service';

export class EmployeeController {
  static async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeCreateRequest = req.body as EmployeeCreateRequest;
      const { username } = req.user ?? {};
      const response = await EmployeeService.createEmployee(request, username ?? '');
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeUpdateRequest = req.body as EmployeeUpdateRequest;
      const { username } = req.user ?? {};
      const employee_id = Number(req.params.id);
      request.id = employee_id;
      const response = await EmployeeService.updateEmployee(request, username ?? '');
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getHistoryEmployee(req: Request, res: Response, next: NextFunction) {
    const { start_date, end_date, page, size } = req.query;
    try {
      const request: SearchEmployeeHistoryRequest = {
        start_date: start_date ? new Date(start_date as string) : undefined,
        end_date: end_date ? new Date(end_date as string) : undefined,
        page: Number(page ?? 1),
        size: Number(size ?? 10),
      };

      const response = await EmployeeService.getEmployeeById(request, Number(req.params.id));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getEmployees(req: Request, res: Response, next: NextFunction) {
    const { name, position, department_id, salary_sort, salary_min, salary_max, page, size } =
      req.query;
    try {
      const request: SearchEmployeeRequest = {
        name: name ? String(name) : undefined,
        position: position ? String(position) : undefined,
        department_id: department_id ? Number(department_id) : undefined,
        salary_sort: salary_sort ? String(salary_sort) : undefined,
        salary_min: salary_min ? Number(salary_min) : undefined,
        salary_max: salary_max ? Number(salary_max) : undefined,
        page: page ? Number(page) : 1,
        size: size ? Number(size) : 10,
      };

      const result = await EmployeeService.getEmployee(request);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const employee_id = Number(req.params.id);
      const { username } = req.user ?? {};
      const response = await EmployeeService.delete(employee_id, username ?? '');
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getCountByDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EmployeeService.countByDepartment();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
