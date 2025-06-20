import React from 'react';
import logo from '../../../assets/logo.png'; 

const Logo = () => {
  return (
    <div className='flex  items-end'>
      <img src={logo} alt="Logo" />
      <p className='text-3xl'>Fast Delivery</p>
    </div>
  );
};

export default Logo;
