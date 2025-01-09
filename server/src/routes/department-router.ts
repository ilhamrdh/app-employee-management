import express from 'express';
import { authMiddleware, authRoles } from '../middleware/auth-middleware';
import { DepartmentController } from '../controllers/department-controller';

export const departmentRouter = express.Router();

departmentRouter.use(authMiddleware, authRoles(['ADMIN', 'HRD']));

departmentRouter.get('/departments', DepartmentController.getDepartments);
departmentRouter.post('/departments/create', DepartmentController.create);
departmentRouter.put('/departments/update/:id', DepartmentController.update);
departmentRouter.delete('/departments/delete/:id', DepartmentController.delete);
