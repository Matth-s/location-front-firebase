import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector(
    (state) => state.authSlice
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
