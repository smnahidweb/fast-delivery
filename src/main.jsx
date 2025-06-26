import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes'


import AuthProvider from './Context/AuthProvider'
import PrivateRoute from './Router/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
   
  <StrictMode>
    <div className='poppins-regular max-w-7xl mx-auto '>
  <QueryClientProvider client={queryClient}>
 <AuthProvider >
       <RouterProvider router={router} />
     </AuthProvider>
  </QueryClientProvider>
      
   

    </div>
  </StrictMode>,
)
