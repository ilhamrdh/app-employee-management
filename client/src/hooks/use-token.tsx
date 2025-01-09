import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useToken = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = () => localStorage.getItem('token');
  const [token, setToken] = useState(getToken());

  const isTokenValid = useCallback(() => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;
      return decoded?.exp > Date.now() / 1000;
    } catch (error) {
      console.error('Failed to decode token', error);
      return false;
    }
  }, [token]);

  useEffect(() => {
    const isTokenValidNow = isTokenValid();

    if (token && isTokenValidNow) {
      if (location.pathname === '/login') {
        navigate('/', { state: { from: location }, replace: true });
      }
    } else {
      localStorage.removeItem('token');
      setToken(null);

      if (location.pathname !== '/login') {
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
  }, [token, location, navigate, isTokenValid]);

  return token;
};

export default useToken;
