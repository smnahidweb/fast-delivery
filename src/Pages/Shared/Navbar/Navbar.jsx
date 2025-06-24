import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router';
import { AuthContext } from '../../../Context/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const links = <>
    
    <li> <NavLink to={'/'}>Home</NavLink> </li>
     <li> <NavLink to={'/about'}>About Us</NavLink> </li>
      <li> <NavLink to={'/login'}>Login</NavLink> </li>
     <li> <NavLink to={'/coverage'}>Coverage</NavLink> </li>
      <li> <NavLink to={'/sendParcel'}>Send a Parcel</NavLink> </li>
    </>
    
    const {user,LogOut} = useContext(AuthContext)
    const handleLogout = ()=>{

      LogOut()
      .then(()=>{
          Swal.fire({
                     title: "Logged Out Successfully!",
                     icon: "success",
                     draggable: true
                   });
                   
      })



    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
        {links}


      </ul>
    </div>
    <a className=" cursor-pointer  text-xl">
        <Logo></Logo>
    </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     
     {links}


    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? <button onClick={handleLogout} className='btn cursor-pointer bg-primary'>Log Out</button>: <NavLink className={' btn bg-primary cursor-pointer'} to={'/login'}>
      Login
    </NavLink>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;