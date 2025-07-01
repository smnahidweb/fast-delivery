import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading";

const MakeAdmin = () => {
  const [emailQuery, setEmailQuery] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const axiosSecure = UseAxiosSecure();

  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", searchEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      return res.data;
    },
    enabled: !!searchEmail, // only run when searchEmail is set
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!emailQuery.trim()) {
      Swal.fire("Please enter an email to search.");
      return;
    }
    setSearchEmail(emailQuery.trim());
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${id}`, { role });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `User role has been updated to ${role}`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-[var( --color-primary)] mb-4">Manage Users</h2>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button
          type="submit"
          className="btn bg-[var( --color-primary)] text-black hover:bg-[var( --color-primary)]"
        >
          Search
        </button>
      </form>

      {isPending ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Make Role</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "User"}</td>
                    <td>
                      <select
                        value={user.role || "User"}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="select select-sm select-bordered"
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Rider">Rider</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
