import TableEmployee from '@/components/employee/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { API_DEPARTMENT_URL, API_EMPLOYEE_URL } from '@/constants/env';
import { instance } from '@/service/axios';
import { DepartmentResponse } from '@/types/department';
import { EmployeeResponse } from '@/types/employee';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useCallback, useEffect, useState } from 'react';

const Dashboad = () => {
  const [data, setData] = useState<EmployeeResponse>();
  const [department, setDepartment] = useState<DepartmentResponse>();
  const [url, setUrl] = useState('');
  const [meta, setMeta] = useState({
    page: 1,
    size: 10,
  });

  const [filters, setFilters] = useState({ name: '', position: '', department: '', salary_sort: '', salary_min: '', salary_max: '' });

  const updateQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries({ ...filters, ...meta }).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    setUrl(`?${params.toString()}`);
  }, [filters, meta]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams();
  };

  const handlePageChange = useCallback((page: number) => {
    setMeta((prev) => ({ ...prev, page }));
  }, []);

  useEffect(() => {
    updateQueryParams();
    const fetchData = async () => {
      try {
        const response = await instance.get(`${API_EMPLOYEE_URL}${url}`);
        const department = await instance.get(`${API_DEPARTMENT_URL}`);

        setData(response?.data);
        setDepartment(department?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [updateQueryParams, url]);

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-gray-600" />
        <div className="aspect-video rounded-xl bg-gray-600" />
        <div className="aspect-video rounded-xl bg-gray-600" />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Input placeholder="Search Name..." value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} />
        <Input placeholder="Search Position..." value={filters.position} onChange={(e) => handleFilterChange('position', e.target.value)} />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {department?.data.map((item) => (
              <SelectItem value={`${item.id}`} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Filter Salary</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <form className="grid gap-2" onSubmit={applyFilter}>
              <div className="space-y-2">
                <Label htmlFor="salarySort">Sort By</Label>
                <Input
                  id="salarySort"
                  value={filters.salary_sort}
                  onChange={(e) => handleFilterChange('salary_sort', e.target.value)}
                  placeholder="asc or desc"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minSalary">Min. Salary</Label>
                <Input
                  id="minSalary"
                  type="number"
                  value={filters.salary_min}
                  onChange={(e) => handleFilterChange('salary_min', e.target.value)}
                  placeholder="min. salary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSalary">Max. Salary</Label>
                <Input
                  id="maxSalary"
                  type="number"
                  value={filters.salary_max}
                  onChange={(e) => handleFilterChange('salary_max', e.target.value)}
                  placeholder="max. salary"
                />
              </div>
              <Button type="submit" className="mt-2">
                Apply
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <TableEmployee data={data ?? { data: [], paging: { current_page: 1, total_page: 1, size: 10 } }} handlePageChange={handlePageChange} />
    </div>
  );
};

export default Dashboad;
