import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import riderImg from "../../assets/rider.png";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const BeRider = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // reset,
    formState: { errors },
  } = useForm();

  const [allDistricts, setAllDistricts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const selectedDistrict = watch("district");

  useEffect(() => {
    axios.get("/Districs.json")
      .then((res) => setAllDistricts(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const unique = [...new Set(allDistricts.map(item => item.district))];
    setDistricts(unique);
  }, [allDistricts]);

  useEffect(() => {
    if (selectedDistrict) {
      const found = allDistricts.find(item => item.district === selectedDistrict);
      setAreas(found?.covered_area || []);
      setValue("area", "");
    }
  }, [selectedDistrict, setValue, allDistricts]);

  const onSubmit = (data) => {
    console.log("Rider Data:", data);
    const riderInfo = {
        ...data ,
        status:'pending'
    }
    
    // reset();
    axiosSecure.post('/riders',riderInfo)
    .then(res =>{
        if(res.data.insertedId){
             Swal.fire({
                      title: "Application sent Successfully!",
                      icon: "success",
                      draggable: true
                    });
        }
    })
    .catch(error =>{
        console.log(error)
    })

  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary">Become a Rider</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Join our trusted network and earn delivering across Bangladesh.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                defaultValue={user?.displayName}
                placeholder="Full Name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
            </div>
            <div>
              <input
                type="email"
                 defaultValue={user?.email}
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
            </div>
          </div>

          {/* Phone & NID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              {...register("phone", { required: true })}
            />
            <input
              type="text"
              placeholder="NID Number"
              className="input input-bordered w-full"
              {...register("nid", { required: true })}
            />
          </div>

          {/* District & Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                className="select select-bordered w-full"
                {...register("district", { required: true })}
              >
                <option value="">Select District</option>
                {districts.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm">District is required</p>}
            </div>
            <div>
              <select
                className="select select-bordered w-full"
                {...register("area", { required: true })}
              >
                <option value="">Select Area</option>
                {areas.map((a, i) => (
                  <option key={i} value={a}>{a}</option>
                ))}
              </select>
              {errors.area && <p className="text-red-500 text-sm">Area is required</p>}
            </div>
          </div>

          {/* Bike & License */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Bike Brand"
              className="input input-bordered w-full"
              {...register("bikeBrand", { required: true })}
            />
            <input
              type="text"
              placeholder="License Number"
              className="input input-bordered w-full"
              {...register("license", { required: true })}
            />
          </div>

          {/* Experience */}
          <textarea
            rows="3"
            placeholder="Your experience (optional)"
            className="textarea textarea-bordered w-full"
            {...register("experience")}
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-primary text-white hover:brightness-105 border-none transition-all duration-300"
          >
            Submit Application
          </button>
        </form>

        {/* Right Image */}
        <div className="w-full h-full">
          <img
            src={riderImg}
            alt="Be a rider"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default BeRider;
