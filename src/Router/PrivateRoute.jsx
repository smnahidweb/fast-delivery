import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Loading from '../Pages/Shared/Loading';
import { Navigate } from 'react-router'; 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
