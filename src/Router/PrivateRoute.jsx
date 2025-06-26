import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Loading from '../Pages/Shared/Loading';
import { Navigate, useLocation } from 'react-router'; 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location)
  
if(loading){
        return <Loading></Loading>
    }
    if(user){
         return children
    }
   return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;
