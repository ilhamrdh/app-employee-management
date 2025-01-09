import { NextFunction, Request, Response } from 'express';
import { DepartmentCreateRequest, DepartmentUpdateRequest } from '../models/department-model';
import { DepartmentService } from '../services/department-service';

export class DepartmentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: DepartmentCreateRequest = req.body as DepartmentCreateRequest;
      const { username } = req.user ?? {};
      const response = await DepartmentService.create(request, username ?? '');
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await DepartmentService.getAll();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { username } = req.user ?? {};
      await DepartmentService.delete(id, username ?? '');
      res.status(200).json({ message: 'Department deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: DepartmentUpdateRequest = req.body as DepartmentUpdateRequest;
      const id = Number(req.params.id);
      const { username } = req.user ?? {};
      request.id = id;
      const response = await DepartmentService.update(request, username ?? '');
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
