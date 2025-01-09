import { Employee } from '@prisma/client';

export type EmployeeResponse = {
  id: number;
  employee_name: string;
  position: string;
  salary: number;
  department_name?: string;
};

export type EmployeeCreateRequest = {
  name: string;
  position: string;
  salary: number;
  department_id: number;
};

export type EmployeeUpdateRequest = {
  id: number;
  name: string;
  position: string;
  salary: number;
  department_id: number;
};

export type EmployeeHistoryRequest = {
  employee_id: number;
  changed_at: Date;
  changed_by: string;
  changed_type: string;
  old_position: string;
  old_salary: number;
  old_department: string;
  new_position: string;
  new_salary: number;
  new_department: string;
};

export type EmployeeHistoryResponse = {
  employee_name: string;
  changed_at: Date;
  changed_by: string;
  changed_type: string;
  old_position: string;
  old_salary: number;
  old_department: string;
  new_position: string;
  new_salary: number;
  new_department: string;
};

export type SearchEmployeeHistoryRequest = {
  start_date?: Date;
  end_date?: Date;
  page: number;
  size: number;
};

export type SearchEmployeeRequest = {
  name?: string;
  position?: string;
  salary_sort?: string;
  salary_min?: number;
  salary_max?: number;
  department_id?: number;
  page: number;
  size: number;
};

export function toEmployeeResponse(employee: Employee): EmployeeResponse {
  return {
    id: employee.id,
    employee_name: employee.name,
    position: employee.position ?? '',
    salary: employee.salary ?? 0,
  };
}
