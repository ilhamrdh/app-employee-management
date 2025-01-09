import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rupiah } from '@/lib/format-currency';
import { EmployeeResponse } from '@/types/employee';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppPagination from '../app-pagination';

interface Props {
  data: EmployeeResponse;
  handlePageChange: (page: number) => void;
}

const TableEmployee: React.FC<Props> = ({ data, handlePageChange }) => {
  const navigate = useNavigate();

  const navigetTo = useCallback(
    (path: string) => {
      navigate({
        pathname: path,
      });
    },
    [navigate]
  );
  return (
    <div className="overflow-x-auto p-5">
      <Table className="min-w-[700px] p-5">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Current Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((employee, index) => (
            <TableRow key={employee.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <button onClick={() => navigetTo(`/employees/${employee.id}`)} className="font-medium hover:underline" type="button">
                  {employee.employee_name}
                </button>
              </TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department_name}</TableCell>
              <TableCell className="text-right">{rupiah(employee.salary)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableCell colSpan={5}>
            <AppPagination
              paging={{ page: data?.paging?.current_page ?? 1, totalPages: data?.paging?.total_page ?? 1 }}
              onPageChange={handlePageChange}
            />
          </TableCell>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableEmployee;
