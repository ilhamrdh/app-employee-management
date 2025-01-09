import { Department, DepartmentHistory } from '@prisma/client';

export type DepartmentResponse = {
  id: number;
  name: string;
};

export type DepartmentCreateRequest = {
  name: string;
};

export type DepartmentUpdateRequest = {
  id: number;
  name: string;
};

export type DepartmentHistoryResponse = {
  id: number;
  department_id: number;
  changed_at: Date;
  changed_by: string;
  old_name: string;
  new_name: string;
};

export function toResponseDepartment(department: Department): DepartmentResponse {
  return {
    id: department.id,
    name: department.name,
  };
}

export function toResponseDepartmentHistory(
  department: DepartmentHistory
): DepartmentHistoryResponse {
  return {
    id: department.id,
    department_id: department.department_id,
    changed_at: department.changed_at,
    changed_by: department?.changed_by ?? '',
    old_name: department.old_name ?? '',
    new_name: department.new_name ?? '',
  };
}
