import React from 'react';
import { Outlet } from 'react-router';
import image from '../assets/authImage.png'
import Logo from '../Pages/Shared/Logo/Logo';

const AuthLayout = () => {
    return (
        <div >
          
                 <div className='mt-4 p-2'>
                       <Logo></Logo>
                 </div>
              <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
                
      {/* Left side - dynamic content */}
      <div className="flex justify-center items-center p-8">
        <Outlet />
      </div>

      {/* Right side - static image */}
      <div className="hidden md:block p-10  ">
        <img
          src={image}
          alt="Auth Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
        </div>
    );
};

export default AuthLayout;