import { createBrowserRouter} from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
 export const router = createBrowserRouter([
  {
  path: "/",
   Component:RootLayout,
   children:[
    {
        index:true,Component:Home,
        
    },
    {
       path:'/coverage',
       Component:Coverage,
       loader: ()=> fetch('/Districs.json')
    },
    {
      path:'/sendParcel',
      element:<PrivateRoute>
        <SendParcel></SendParcel>
      </PrivateRoute>,
       loader: ()=> fetch('/Districs.json')
    }
   ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'/login',
        Component:Login
      },{
        path:'/register',
        Component:Register
      }
    ]
  }
])
