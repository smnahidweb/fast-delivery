import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes'

import AOS from 'aos';
import 'aos/dist/aos.css'; 
   AOS.init();

createRoot(document.getElementById('root')).render(
   
  <StrictMode>
    <div className='poppins-regular max-w-7xl mx-auto '  data-aos="fade-up-right">
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
