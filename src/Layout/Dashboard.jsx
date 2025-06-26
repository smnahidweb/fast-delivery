import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaBars } from 'react-icons/fa';
import Logo from '../Pages/Shared/Logo/Logo';
const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
      {/* Toggle for small devices */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Top bar for small devices */}
        <div className="w-full flex justify-between items-center p-4 bg-primary  lg:hidden">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost text-xl">
            <FaBars />
          </label>
          <h2 className="text-lg font-bold">Dashboard</h2>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
          <Logo></Logo>
          <li><a>Dashboard Home</a></li>
         <Link to={'/dashboard/myParcels'}> 
         <li><a>My Parcels</a></li>
          </Link>
          <li><a>Send Parcel</a></li>
          <li><a>Profile</a></li>
         
        </ul>
      </div>
    </div>
    );
};

export default Dashboard;