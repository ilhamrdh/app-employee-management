import useToken from '@/hooks/use-token';
import { Navigate } from 'react-router-dom';

interface Props {
  isPrivate: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ isPrivate, children }) => {
  const token = useToken();

  return isPrivate && token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
