import { prismaClient } from '../configs/database';
import { ResponseError } from '../exceptions/error-response';
import {
  DepartmentCreateRequest,
  DepartmentResponse,
  DepartmentUpdateRequest,
  toResponseDepartment,
} from '../models/department-model';
import { Validation } from '../validation';
import { DepartmentValidation } from '../validation/department-validation';

export class DepartmentService {
  static async create(
    req: DepartmentCreateRequest,
    changedBy: string
  ): Promise<DepartmentResponse> {
    const departmentRequest = Validation.validate(DepartmentValidation.CreateDepartment, req);

    const departmentExist = await prismaClient.department.findFirst({
      where: {
        name: departmentRequest.name,
      },
    });

    if (departmentExist) {
      throw new ResponseError(400, 'Department name already exist');
    }

    const department = await prismaClient.department.create({
      data: departmentRequest,
    });

    await prismaClient.departmentHistory.create({
      data: {
        changed_by: changedBy,
        department: {
          connect: {
            id: department.id,
          },
        },
        new_name: departmentRequest.name,
      },
    });

    return toResponseDepartment(department);
  }

  static async getAll(): Promise<DepartmentResponse[]> {
    const departments = await prismaClient.department.findMany();
    return departments.map(toResponseDepartment);
  }

  static async update(
    req: DepartmentUpdateRequest,
    changedBy: string
  ): Promise<DepartmentResponse> {
    const departmentRequest = Validation.validate(DepartmentValidation.UpdateDepartment, req);

    const departmentExist = await prismaClient.department.findUnique({
      where: {
        id: departmentRequest.id,
      },
    });

    if (!departmentExist) {
      throw new ResponseError(400, 'Department not found');
    }

    if (departmentExist.name === departmentRequest.name) {
      throw new ResponseError(400, 'Department name already exist');
    }

    const [_, department] = await prismaClient.$transaction([
      prismaClient.departmentHistory.create({
        data: {
          changed_by: changedBy,
          department: {
            connect: {
              id: departmentRequest.id,
            },
          },
          new_name: departmentRequest.name,
          old_name: departmentExist.name,
        },
      }),
      prismaClient.department.update({
        data: departmentRequest,
        where: { id: departmentRequest.id },
      }),
    ]);

    return toResponseDepartment(department);
  }

  static async delete(id: number, changedBy: string): Promise<void> {
    if (typeof id !== 'number') {
      throw new ResponseError(400, 'Id must be number');
    }
    const departmentExist = await prismaClient.department.findUnique({
      where: { id: id },
    });

    if (!departmentExist) {
      throw new ResponseError(400, 'Department not found');
    }

    await prismaClient.$transaction([
      prismaClient.departmentHistory.create({
        data: {
          changed_by: changedBy,
          department: {
            connect: {
              id: id,
            },
          },
          new_name: departmentExist.name,
          old_name: departmentExist.name,
        },
      }),
      prismaClient.department.delete({
        where: { id: id },
      }),
    ]);
  }
}
