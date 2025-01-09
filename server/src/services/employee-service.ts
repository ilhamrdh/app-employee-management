import { Prisma } from '@prisma/client';
import { prismaClient } from '../configs/database';
import { ResponseError } from '../exceptions/error-response';
import {
  EmployeeCreateRequest,
  EmployeeHistoryResponse,
  EmployeeResponse,
  EmployeeUpdateRequest,
  SearchEmployeeHistoryRequest,
  SearchEmployeeRequest,
  toEmployeeResponse,
} from '../models/employee-model';
import { Pageable } from '../models/pagination';
import { Validation } from '../validation';
import { EmployeeValidation } from '../validation/employee-validation';

export class EmployeeService {
  static async createEmployee(
    req: EmployeeCreateRequest,
    changedBy: string
  ): Promise<EmployeeResponse> {
    const employeeRequest = Validation.validate(EmployeeValidation.CreateEmployee, req);

    const existDepartment = await prismaClient.department.findUnique({
      where: {
        id: employeeRequest.department_id,
      },
    });

    if (!existDepartment) {
      throw new ResponseError(404, 'id department not found');
    }

    const employee = await prismaClient.employee.create({
      data: {
        ...employeeRequest,
        salary: Number(employeeRequest.salary),
      },
    });

    await prismaClient.employeeHistory.create({
      data: {
        employee_id: employee.id,
        changed_by: changedBy,
        changed_type: 'CREATED',
        new_department_id: employeeRequest.department_id,
        new_position: employeeRequest.position,
        new_salary: Number(employeeRequest.salary),
      },
    });

    const response = toEmployeeResponse(employee);
    response.department_name = existDepartment.name;

    return response;
  }

  static async updateEmployee(
    req: EmployeeUpdateRequest,
    changedBy: string
  ): Promise<EmployeeResponse> {
    const employeeRequest = Validation.validate(EmployeeValidation.UpdateEmployee, req);

    const [existEmployee, existDepartment] = await prismaClient.$transaction([
      prismaClient.employee.findUnique({
        where: { id: employeeRequest.id, is_deleted: false },
      }),
      prismaClient.department.findUnique({
        where: { id: employeeRequest.department_id },
      }),
    ]);

    if (!existEmployee) {
      throw new ResponseError(404, 'id employee not found');
    }

    if (!existDepartment) {
      throw new ResponseError(404, 'id department not found');
    }

    const [_, employee] = await prismaClient.$transaction([
      prismaClient.employeeHistory.create({
        data: {
          employee_id: existEmployee.id,
          changed_by: changedBy,
          changed_type: 'UPDATED',
          old_department_id: existEmployee.department_id,
          old_position: existEmployee.position,
          old_salary: Number(existEmployee.salary),
          new_department_id: employeeRequest.department_id,
          new_position: employeeRequest.position,
          new_salary: Number(employeeRequest.salary),
        },
      }),
      prismaClient.employee.update({
        where: { id: employeeRequest.id },
        data: {
          position: employeeRequest.position,
          department_id: employeeRequest.department_id,
          name: employeeRequest.name,
          salary: Number(employeeRequest.salary),
        },
      }),
    ]);

    const response = toEmployeeResponse({
      ...employee,
    });
    response.department_name = existDepartment.name;

    return response;
  }

  static async getEmployeeById(
    req: SearchEmployeeHistoryRequest,
    employeeId: number
  ): Promise<Pageable<EmployeeHistoryResponse>> {
    const pageable = Validation.validate(EmployeeValidation.SearchEmployeeHistory, req);
    const skip = (pageable.page - 1) * pageable.size;

    const employeeWithHistory = await prismaClient.employee.findUnique({
      where: {
        id: employeeId,
        is_deleted: false,
      },
      include: {
        history: {
          where: {
            AND: [
              pageable.start_date
                ? { created_at: { gte: new Date(pageable.start_date) } }
                : undefined,
              pageable.end_date ? { created_at: { lte: new Date(pageable.end_date) } } : undefined,
            ].filter(Boolean) as Prisma.EmployeeHistoryWhereInput[],
          },
          skip: skip,
          take: pageable.size,
          orderBy: {
            changed_at: 'desc',
          },
        },
      },
    });

    if (!employeeWithHistory) {
      throw new ResponseError(404, 'id employee not found');
    }

    const totalRecords = await prismaClient.employeeHistory.count({
      where: {
        employee_id: employeeId,
        AND: [
          pageable.start_date && { created_at: { gte: new Date(pageable.start_date) } },
          pageable.end_date && { created_at: { lte: new Date(pageable.end_date) } },
        ].filter(Boolean) as Prisma.EmployeeHistoryWhereInput[],
      },
    });

    const data: EmployeeHistoryResponse[] = employeeWithHistory.history.map((history) => ({
      employee_name: employeeWithHistory.name,
      changed_by: history.changed_by ?? '',
      changed_type: history.changed_type ?? '',
      changed_at: history.changed_at ?? null,
      old_position: history.old_position ?? '',
      old_salary: history.old_salary ?? 0,
      old_department: (history.old_department_id ?? 0).toString(),
      new_position: history.new_position ?? '',
      new_salary: history.new_salary ?? 0,
      new_department: (history.new_department_id ?? 0).toString(),
    }));

    return {
      additional_info: {
        employee_name: employeeWithHistory.name,
        position: employeeWithHistory.position ?? '',
        salary: employeeWithHistory.salary ?? 0,
        departmen: employeeWithHistory.department_id ?? 0,
      },
      data: data,
      paging: {
        current_page: pageable.page,
        total_page: Math.ceil(totalRecords / pageable.size),
        size: pageable.size,
      },
    };
  }

  static async getEmployee(req: SearchEmployeeRequest): Promise<Pageable<EmployeeResponse>> {
    const pageable = Validation.validate(EmployeeValidation.SearchEmployee, req);
    const skip = (pageable.page - 1) * pageable.size;

    const filters: any = {};
    if (req.name) {
      filters.name = { contains: req.name, mode: 'insensitive' };
    }
    if (req.position) {
      filters.position = { contains: req.position, mode: 'insensitive' };
    }
    if (req.department_id) {
      filters.department_id = req.department_id;
    }

    if (req.salary_min !== undefined || req.salary_max !== undefined) {
      filters.salary = {
        ...(req.salary_min !== undefined && { gte: req.salary_min }),
        ...(req.salary_max !== undefined && { lte: req.salary_max }),
      };
    }

    let orderBy: any = { created_at: 'desc' };
    if (req.salary_sort !== undefined) {
      orderBy = { salary: req.salary_sort === 'asc' ? 'asc' : 'desc' };
    }

    const employees = await prismaClient.employee.findMany({
      where: {
        ...filters,
        is_deleted: false,
      },
      skip: skip,
      take: pageable.size,
      orderBy: orderBy,
      include: {
        Department: true,
      },
    });

    const totalRecords = await prismaClient.employee.count({
      where: {
        ...filters,
        is_deleted: false,
      },
    });

    return {
      data: employees.map((employee) => ({
        id: employee.id,
        employee_name: employee.name,
        position: employee.position ?? '',
        salary: employee.salary ?? 0,
        department_name: employee.Department?.name ?? '',
      })),
      paging: {
        current_page: pageable.page,
        total_page: Math.ceil(totalRecords / pageable.size),
        size: pageable.size,
      },
    };
  }

  static async delete(id: number, changedBy: string): Promise<void> {
    if (typeof id !== 'number') {
      throw new ResponseError(400, 'Id must be number');
    }

    const employeeExist = await prismaClient.employee.findUnique({
      where: { id: id },
    });

    if (!employeeExist) {
      throw new ResponseError(404, 'id employee not found');
    }

    await prismaClient.$transaction([
      prismaClient.employeeHistory.create({
        data: {
          employee_id: employeeExist.id,
          changed_by: changedBy,
          changed_type: 'DELETED',
          old_department_id: employeeExist.department_id,
          old_position: employeeExist.position,
          old_salary: employeeExist.salary,
        },
      }),
      prismaClient.employee.update({
        where: { id: id },
        data: { is_deleted: true },
      }),
    ]);
  }

  static async countByDepartment(): Promise<{ department_name: string; count: number }[]> {
    const groupedEmployees = await prismaClient.employee.groupBy({
      by: ['department_id'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      where: {
        is_deleted: false,
      },
    });

    const departments = await prismaClient.department.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const result = groupedEmployees.map((group) => {
      const department = departments.find((d) => d.id === group.department_id);
      return {
        department_name: department?.name ?? 'Unknown Department',
        count: group._count.id,
      };
    });

    return result;
  }
}
