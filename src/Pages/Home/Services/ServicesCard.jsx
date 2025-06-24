import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const ServicesCard = ({service}) => {
      const { icon, title, description } = service;
useEffect(() => {
   AOS.init({
      duration: 2000, // Animation duration
      once: true,     // Whether animation should happen only once
    });
  }, []);
    return (
        <div data-aos="fade-right">
             <div className="card bg-base-100 dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 
              h-[250px] hover:bg-secondary" data-aos="zoom-in-up">
      <div className="card-body items-center text-center">
        <div className="mb-4">{icon}</div>
        <h2 className="card-title text-xl text-gray-800 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
        </div>
    );
};

export default ServicesCard;