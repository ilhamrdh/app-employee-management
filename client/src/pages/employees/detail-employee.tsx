import { rupiah } from '@/lib/format-currency';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/format-date';
import AppPagination from '@/components/app-pagination';
import { useCallback } from 'react';

const detailEmployee = {
  additional_info: {
    employee_name: 'Jhon Doe',
    position: 'Software Analyst',
    salary: 5000000,
    departmen: 6,
  },
  data: [
    {
      employee_name: 'Jhon Doe',
      position: 'Software Analyst',
      salary: 5000000,
      id: 13,
      employee_id: 1,
      changed_at: '2025-01-08T07:32:07.154Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software QA',
      old_salary: 5000000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software Analyst',
      new_salary: 5000000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software QA',
      salary: 5000000,
      id: 12,
      employee_id: 1,
      changed_at: '2025-01-08T07:30:19.444Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software QA',
      old_salary: 5000000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software QA',
      new_salary: 5000000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software QA',
      salary: 5000000,
      id: 11,
      employee_id: 1,
      changed_at: '2025-01-08T07:28:42.633Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Analyst',
      old_salary: 5000000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software QA',
      new_salary: 5000000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software Analyst',
      salary: 5000000,
      id: 10,
      employee_id: 1,
      changed_at: '2025-01-08T07:28:16.509Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Analyst',
      old_salary: 400000,
      old_department_id: 7,
      new_name: null,
      new_position: 'Software Analyst',
      new_salary: 5000000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software Analyst',
      salary: 400000,
      id: 9,
      employee_id: 1,
      changed_at: '2025-01-08T07:28:05.646Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Analyst',
      old_salary: 400000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software Analyst',
      new_salary: 400000,
      new_department_id: 7,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software Analyst',
      salary: 400000,
      id: 8,
      employee_id: 1,
      changed_at: '2025-01-08T07:27:58.938Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Analyst',
      old_salary: 500000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software Analyst',
      new_salary: 400000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software Analyst',
      salary: 500000,
      id: 7,
      employee_id: 1,
      changed_at: '2025-01-08T07:27:52.135Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Analyst',
      old_salary: 500000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software Analyst',
      new_salary: 500000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software Analyst',
      salary: 500000,
      id: 6,
      employee_id: 1,
      changed_at: '2025-01-08T07:25:42.695Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Engineer',
      old_salary: 1000000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software Analyst',
      new_salary: 500000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: 'Software Engineer',
      salary: 1000000,
      id: 4,
      employee_id: 1,
      changed_at: '2025-01-08T07:23:19.794Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Analyst',
      old_salary: 900000,
      old_department_id: 6,
      new_name: null,
      new_position: 'Software Engineer',
      new_salary: 1000000,
      new_department_id: 6,
    },
    {
      employee_name: 'Jhon Doe',
      position: '',
      salary: 0,
      id: 3,
      employee_id: 1,
      changed_at: '2025-01-08T05:46:01.062Z',
      changed_by: 'admin1',
      changed_type: 'UPDATED',
      old_name: null,
      old_position: 'Software Analyst',
      old_salary: 1000000,
      old_department_id: 1,
      new_name: null,
      new_position: null,
      new_salary: null,
      new_department_id: 6,
    },
  ],
  paging: {
    current_page: 1,
    total_page: 2,
    size: 10,
  },
};

const DetailEmployee = () => {
  const { employee_id } = useParams();
  console.log(employee_id);

  const handlePageChange = useCallback((page: number) => {
    console.log(page);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl border-1 flex items-center gap-4 px-4">
          <img
            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="profile"
            className="h-52 w-52 object-cover rounded-full"
          />
          <div>
            <p className="text-lg font-bold">{detailEmployee.additional_info.employee_name}</p>
            <p className="text-base">{detailEmployee.additional_info.position}</p>
            <p className="text-base">{rupiah(detailEmployee.additional_info.salary)}</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-5">
        <Table className="min-w-[700px] p-5">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>Changed Name</TableHead>
              <TableHead>Changed Date</TableHead>
              <TableHead>Changed Type</TableHead>
              <TableHead>Old Position</TableHead>
              <TableHead>Old Salary</TableHead>
              <TableHead>Old Department</TableHead>
              <TableHead>New Position</TableHead>
              <TableHead>New Salary</TableHead>
              <TableHead>New Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detailEmployee.data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.changed_by}</TableCell>
                <TableCell>{formatDate(item.changed_at)}</TableCell>
                <TableCell>{item.changed_type}</TableCell>
                <TableCell>{item.old_position ?? '-'}</TableCell>
                <TableCell>{item.old_salary ? rupiah(item.old_salary) : '-'} </TableCell>
                <TableCell>{item.old_department_id ?? '-'}</TableCell>
                <TableCell>{item.new_position ?? '-'}</TableCell>
                <TableCell>{item.new_salary ? rupiah(item.new_salary) : '-'}</TableCell>
                <TableCell>{item.new_department_id ?? '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableCell colSpan={10}>
              <AppPagination
                paging={{ page: detailEmployee.paging.current_page, totalPages: detailEmployee.paging.total_page }}
                onPageChange={handlePageChange}
              />
            </TableCell>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default DetailEmployee;
