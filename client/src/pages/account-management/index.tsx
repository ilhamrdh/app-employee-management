import TableEmployee from '@/components/employee/table';
import DropdownInput from '@/components/input-dropdown';
import TextInput from '@/components/input-text';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { API_DEPARTMENT_URL, API_EMPLOYEE_URL } from '@/constants/env';
import { instance } from '@/service/axios';
import { Department } from '@/types/department';
import { EmployeeResponse } from '@/types/employee';
import accountValidation, { AccountType } from '@/validation/account-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const AccountManagement = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const [departments, setDepartments] = useState<Department[]>([]);
  const [data, setData] = useState<EmployeeResponse>();
  const [meta, setMeta] = useState({
    page: 1,
    size: 10,
  });

  const updateQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries({ ...meta }).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    setUrl(`?${params.toString()}`);
  }, [meta]);

  const form = useForm<AccountType>({
    resolver: zodResolver(accountValidation),
    defaultValues: {
      name: '',
      position: '',
      salary: 0,
      department_id: 0,
    },
  });

  const fetchDepartments = useCallback(async () => {
    try {
      const employee = await instance.get(`${API_EMPLOYEE_URL}${url}`);
      const department = await instance.get(`${API_DEPARTMENT_URL}`);
      setData(employee.data);
      setDepartments(department.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  useEffect(() => {
    fetchDepartments();
    updateQueryParams();
  }, [fetchDepartments, updateQueryParams]);

  const onSubmit = useCallback(
    async (data: AccountType) => {
      try {
        setLoading(true);
        const formdata = {
          name: data.name,
          position: data.position,
          salary: Number(data.salary),
          department_id: Number(data.department_id),
        };
        console.log(formdata);

        const response = await instance.post(`${API_EMPLOYEE_URL}/create`, formdata);
        console.log(response);
        alert('Account added successfully');
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert('Failed to add account. Message: ' + error);
      } finally {
        setLoading(false);
        form.reset();
      }
    },
    [form]
  );

  const handlePageChange = useCallback((page: number) => {
    setMeta((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div>
      <div className="p-4 max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <TextInput<AccountType> name="name" label="Username" placeholder="e.g. Johndoe" isRequired />
            <TextInput<AccountType> name="position" label="position" placeholder="e.g. Software Engineer" isRequired />
            <TextInput<AccountType> name="salary" label="Salary" placeholder="e.g. 1000000" type="number" isRequired />
            <DropdownInput<AccountType> name="department_id" label="Department" placeholder="Select department" data={departments} isRequired />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                Add
              </Button>
              <Button type="reset" className="bg-red-500" onClick={() => form.reset()}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <TableEmployee data={data ?? { data: [], paging: { current_page: 1, total_page: 1, size: 10 } }} handlePageChange={handlePageChange} />
    </div>
  );
};

export default AccountManagement;
