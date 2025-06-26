import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const {register,handleSubmit, formState: { errors },} = useForm()
    const {SignIn, GoogleSignIn} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    
    const onSubmit = data =>{
        console.log('submitted Data',data)
        const {email,password} = data
       SignIn(email,password)
           .then((userCredential) => {
           // Signed up 
           const user = userCredential.user;
             Swal.fire({
             title: "WelCome Back, Logged In Successfully!",
             icon: "success",
             draggable: true
           });
           navigate(`${location.state?location.state:'/' }`)
           
           console.log(user)
         
         })
         .catch((error) => {
          console.log(error)
         
         });
    }
    const handleGoogleLogin= ()=>{
      GoogleSignIn()
      .then((result)=>{
        const user = result.user;
        console.log(user)
        Swal.fire({
             title: " Logged In Successfully!",
             icon: "success",
             draggable: true
           });
           navigate(`${location.state?location.state:"/"}`)

      })
      .catch((error)=>{
        console.log(error)
      })
    }

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-primary">Welcome Back</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email"  className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email')}     
            id="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
            required
          />
          
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register('password',{ required: true, minLength: 6 })}
            id="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="••••••••"
            required
          />
          {
            errors.password?.type==='required' && <p className="text-red-500">Password is required</p>
          }
           {
            errors.password?.type==='minLength' && <p className="text-red-500">Password should be 6 characters or longer more</p>
          }
          <div className="text-left mt-2 mb-2">
            <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className=" cursor-pointer w-full bg-primary hover:brightness-90 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-400 text-sm">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Continue with Google */}
      <button onClick={handleGoogleLogin}
        className=" cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
      >
        <FcGoogle className="text-xl" />
        <span className="font-medium">Continue with Google</span>
      </button>

      {/* Redirect to Register */}
      <p className="text-left text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-primary font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
