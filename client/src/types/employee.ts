import { Pagination } from './pagination';

export type Employee = {
  id: number;
  employee_name: string;
  position: string;
  salary: number;
  department_name: string;
};

export type EmployeeResponse = {
  data: Employee[];
  paging: Pagination;
};
