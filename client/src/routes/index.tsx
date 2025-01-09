import Dashboad from '@/pages/dashboard';
import DetailEmployee from '@/pages/employees/detail-employee';
import Login from '@/pages/login';
import PrivateRoute from './private-route';
import AccountManagement from '@/pages/account-management';

interface Route {
  name: string;
  path: string;
  element: React.ReactNode;
}

export const routes: Route[] = [
  {
    name: 'Dashboard',
    path: '/',
    element: (
      <PrivateRoute isPrivate>
        <Dashboad />
      </PrivateRoute>
    ),
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
  },
  {
    name: 'Employee',
    path: 'employees/:employee_id',
    element: (
      <PrivateRoute isPrivate>
        <DetailEmployee />
      </PrivateRoute>
    ),
  },
  {
    name: 'Accounts Management',
    path: '/accounts-management',
    element: (
      <PrivateRoute isPrivate>
        <AccountManagement />
      </PrivateRoute>
    ),
  },
  {
    name: 'Data Master',
    path: '/data-master',
    element: (
      <PrivateRoute isPrivate>
        <Dashboad />
      </PrivateRoute>
    ),
  },
];
