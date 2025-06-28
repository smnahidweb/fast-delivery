import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaBars } from 'react-icons/fa';
import { FaHome, FaBox, FaMoneyCheckAlt, FaPaperPlane, FaUser } from 'react-icons/fa';
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
          <li>
    <Link to="/dashboard">
      <FaHome className="mr-2" /> Dashboard Home
    </Link>
  </li>

  <li>
    <Link to="/dashboard/myParcels">
      <FaBox className="mr-2" /> My Parcels
    </Link>
  </li>

  <li>
    <Link to="/dashboard/paymentHistory">
      <FaMoneyCheckAlt className="mr-2" /> Payment History
    </Link>
  </li>

  <li>
    <Link to="/dashboard/sendParcel">
      <FaPaperPlane className="mr-2" /> Send Parcel
    </Link>
  </li>

  <li>
    <Link to="/dashboard/pendingRiders">
      <FaPaperPlane className="mr-2" /> Pending Riders
    </Link>
  </li>
 
  <li>
    <Link to="/dashboard/activeRiders">
      <FaPaperPlane className="mr-2" /> Active Riders
    </Link>
  </li>

  <li>
    <Link to="/dashboard/profile">
      <FaUser className="mr-2" /> Profile
    </Link>
  </li>
        </ul>
      </div>
    </div>
    );
};

export default Dashboard;