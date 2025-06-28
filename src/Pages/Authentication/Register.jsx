import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import UseAxios from "../../Hooks/UseAxios";


const Register = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();
  const {CreateUser,UpdatedInfo} = useContext(AuthContext)
  const[photo,setPhoto] = useState('')
  const axiosPublic = UseAxios()
  const navigate = useNavigate()
 
  const onSubmit = (data) => {
    console.log("Register Form Data:", data);
    const {email,password}=  data;
    console.log(email,password)
    


  

    CreateUser(email,password)
    .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;


      const userInfo ={

      email: data.email,
      role:'user' ,
      created_at : new Date().toISOString(),
      last_log_at: new Date().toISOString()


    }
     await axios.post('http://localhost:5000/users',userInfo)
   .then(res =>{
    console.log(res.data)
   })
   .catch(error =>{
    console.log(error)
   })



    const profileInfo ={
      displayName: data.name,
      photoURL:photo
    }
    UpdatedInfo(profileInfo)
    .then( () =>{
      console.log('success uploaded')

    })
    .catch(error =>{
      console.log(error)
    })
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
  const handleUploadPhoto = async (e) => {
  const image = e.target.files[0];
  console.log(image)
  
  const formData = new FormData();
  formData.append('image', image);

  const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Key}`;

  try {
    const res = await axios.post(imageUrl, formData);
    setPhoto(res.data.data.url);
  } catch (err) {
    console.error("Image upload error:", err);
  }
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
           Upload Your Photo
          </label>
          <input
          onChange={handleUploadPhoto}
            type="file"
            id="photo"
            
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder=""
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
