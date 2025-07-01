import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../Shared/Loading";
import Swal from "sweetalert2";

const PendingRiders = () => {
 
  const [selectedRider, setSelectedRider] = useState(null);
  const [actionType, setActionType] = useState("");
  const axiosSecure = UseAxiosSecure()


 const {data:riders=[],refetch,isPending} = useQuery({
    queryKey:['pendingRiders'],
    queryFn: async ()=>{
      const res =   axiosSecure.get('/riders/pending')
      return (await res).data
    }


 })
 if(isPending){
    return <Loading></Loading>
 }

  const handleAction = (rider, type) => {
    setSelectedRider(rider);
    setActionType(type);
    document.getElementById("action_modal").showModal();
    // confirmAction(email)

  };

  const confirmAction = async () => {
    try {
      const updatedStatus = actionType === "approve" ? "active" : "cancelled";
    await axiosSecure.put(`/riders/${selectedRider._id}`, {
  status: updatedStatus,
  email: selectedRider.email
});

      refetch()
    //  riders((prev) => prev.filter((r) => r._id !== selectedRider._id));
    //   document.getElementById("action_modal").close();
     Swal.fire({
      icon: 'success',
      title: `Rider ${actionType} successfully`,
      text: `${selectedRider.name} has been ${actionType}.`,
      timer: 2000,
      showConfirmButton: false
    });
    } catch (err) {
      console.error(err);
    }
  };

  const openViewModal = (rider) => {
    setSelectedRider(rider);
    document.getElementById("view_modal").showModal();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Pending Riders</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>District</th>
              <th>Bike</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.phone}</td>
                <td>{rider.district}</td>
                <td>{rider.bikeBrand}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => openViewModal(rider)}
                    className="btn btn-sm btn-outline text-blue-500 border-blue-300"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleAction(rider, "approve",rider?.email)}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleAction(rider, "cancel",rider?.email)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    title="Cancel"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riders.length === 0 && (
          <p className="text-center p-6 text-gray-500">No pending riders found.</p>
        )}
      </div>

      {/* Confirm Modal */}
      <dialog id="action_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-primary">
            Confirm {actionType === "approve" ? "Approval" : "Cancellation"}
          </h3>
          <p className="py-4">
            Are you sure you want to{" "}
            <span className="font-semibold text-red-500">{actionType}</span> rider{" "}
            <span className="font-semibold">{selectedRider?.name}</span>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              <button className="btn">Close</button>
              <button
                type="button"
                onClick={confirmAction}
                className="btn bg-primary text-white hover:brightness-105"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* View Modal */}
      <dialog id="view_modal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-xl text-primary mb-2">Rider Details</h3>
          {selectedRider && (
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Area:</strong> {selectedRider.area}</p>
              <p><strong>Bike:</strong> {selectedRider.bikeBrand}</p>
              <p><strong>License:</strong> {selectedRider.license}</p>
              {selectedRider.experience && (
                <p><strong>Experience:</strong> {selectedRider.experience}</p>
              )}
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingRiders;
