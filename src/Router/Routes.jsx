import { createBrowserRouter} from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import Dashboard from "../Layout/Dashboard";
import MyParcel from "../Pages/Dashboard/MyParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import BeRider from "../Pages/BeRider/BeRider";
import PendingRiders from "../Pages/Dashboard/PendingRider/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
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
      path:'/beRider',
     element:<PrivateRoute>
      <BeRider></BeRider>
     </PrivateRoute>
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
  },
  {
    path:'/dashboard',
    element:<PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children:[
      {
        path:'myParcels',
        Component:MyParcel
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'pendingRiders',
        Component:PendingRiders

      }
      ,{
        path:'activeRiders',
        Component:ActiveRiders
      }

    ]
  }
])
