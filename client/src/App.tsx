import { Route, Routes } from 'react-router-dom';
import useToken from './hooks/use-token';
import Layout from './layouts';
import { routes } from './routes';

const App = () => {
  const token = useToken();
  const isAuthenticated = !!token;
  return isAuthenticated ? (
    <Layout>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} path={route.path} element={route.element}></Route>;
        })}
      </Routes>
    </Layout>
  ) : (
    <Routes>
      {routes.map((route) => {
        return <Route key={route.path} path={route.path} element={route.element}></Route>;
      })}
    </Routes>
  );
};

export default App;
