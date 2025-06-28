import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaBan, FaSearch } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ActiveRiders = () => {
  const [search, setSearch] = useState("");
 
  const axiosSecure = UseAxiosSecure()
  // Fetch all approved riders
  const { data: riders = [], isLoading,refetch } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Handle Deactivation (without useMutation)
  const handleDeactive = async (rider) => {
    const confirm = await Swal.fire({
      title: `Deactivate ${rider.name}?`,
      text: "Are you sure you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C7E75F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.put(`/riders/${rider._id}`, { status: "deactivated" });

        // Refetch the active riders list
        // queryClient.invalidateQueries(["activeRiders"]);
        refetch()

        Swal.fire({
          icon: "success",
          title: "Rider Deactivated",
          text: `${rider.name} is now inactive.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire("Error", "Something went wrong!", "error");
        console.error(error);
      }
    }
  };

  // Filter by name
  const filteredRiders = riders.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Active Riders</h2>

      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>District</th>
              <th>Bike</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">Loading...</td>
              </tr>
            ) : filteredRiders.length > 0 ? (
              filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.district}</td>
                  <td>{rider.bikeBrand}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDeactive(rider)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      title="Deactivate"
                    >
                      <FaBan />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
