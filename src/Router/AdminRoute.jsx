import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import UseUserRole from '../Hooks/UseUserRole';
import Loading from '../Pages/Shared/Loading';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {

    const {user,loading} = useContext(AuthContext)
    const{ role, isRoleLoading } = UseUserRole()
    const location = useLocation()
    if(loading || isRoleLoading){
        return Loading

    }
    if(!user || role !=='Admin'){
        return <Navigate state={location.pathname} to={'/forbidden'} ></Navigate>
    }


    return children
};

export default AdminRoute;