import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='poppins-regular max-w-7xl mx-auto'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
