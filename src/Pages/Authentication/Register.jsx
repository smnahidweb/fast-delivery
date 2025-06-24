import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";


const Register = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();
  const {CreateUser} = useContext(AuthContext)
  const navigate = useNavigate()
 
  const onSubmit = (data) => {
    console.log("Register Form Data:", data);
    const {email,password}=  data;
    console.log(email,password)
    
    CreateUser(email,password)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
      Swal.fire({
      title: "Account Created  Successfully!",
      icon: "success",
      draggable: true
    });
    navigate('/')
    console.log(user)
    // ...
  })
  .catch((error) => {
   console.log(error)
    // ..
  });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-primary">Create an Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nahid Hasan"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium mb-1 text-gray-700">
            Photo URL
          </label>
          <input
            type="url"
            id="photo"
            {...register("photo", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true,minLength:6,pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message: "Password must include uppercase, lowercase, and number",
    },})}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="••••••••"
          />
          {
            errors.password?.type==="minLength" && <p className="text-red-600 text-sm mt-1">Password should be 6 characters or longer more</p>
          }
          {errors.password && (
  <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
)}
          
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:brightness-90 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-400 text-sm">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Continue with Google */}
      <button
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
      >
        <FcGoogle className="text-xl" />
        <span className="font-medium">Continue with Google</span>
      </button>

      {/* Redirect to Login */}
      <p className="text-left text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
