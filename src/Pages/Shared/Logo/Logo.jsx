import React from 'react';
import logo from '../../../assets/logo.png'; 
import { NavLink } from 'react-router';

const Logo = () => {
  return (
    <NavLink to="/">
      <div className='flex  items-end'>
      <img src={logo} alt="Logo" />
      <p className='text-3xl'>Fast Delivery</p>
    </div>
    </NavLink>
  );
};

export default Logo;
