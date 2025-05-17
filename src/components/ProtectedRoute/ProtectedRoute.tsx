import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: ReactElement;
  anonymousOnly?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  anonymousOnly = false
}) => {
  const user = useSelector((state) => state.user.user);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  const location = useLocation();

  if (!isAuthChecked) return null;

  const isLoggedIn = !!user;

  if (anonymousOnly && isLoggedIn) {
    return <Navigate to='/' replace />;
  }

  if (!anonymousOnly && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
