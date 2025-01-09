import express from 'express';
import { EmployeeController } from '../controllers/employee-controller';
import { authMiddleware, authRoles } from '../middleware/auth-middleware';

const router = express.Router();

router.post(
  '/employees/create',
  authMiddleware,
  authRoles(['ADMIN', 'HRD']),
  EmployeeController.createEmployee
);

router.put(
  '/employees/update/:id',
  authMiddleware,
  authRoles(['ADMIN', 'HRD']),
  EmployeeController.updateEmployee
);

router.put(
  '/employees/delete/:id',
  authMiddleware,
  authRoles(['ADMIN', 'HRD']),
  EmployeeController.delete
);

router.get(
  '/employees/count-by-department',
  authMiddleware,
  EmployeeController.getCountByDepartment
);

router.get('/employees/history/:id', authMiddleware, EmployeeController.getHistoryEmployee);
router.get('/employees', authMiddleware, EmployeeController.getEmployees);

export const employeeRouter = router;
