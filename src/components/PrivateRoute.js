import { Navigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

export const PrivateRoute = ({ children }) => {
  const [data] = useStateValue();

  if (!data.isAuthenticated) {
    return <Navigate to='/' />;
  }
  return children;
};
