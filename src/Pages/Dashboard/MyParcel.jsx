import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate()

  const { data: parcels = [], isLoading, error, refetch } = useQuery({
    queryKey: ['myParcel', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This parcel will be deleted permanently!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/parcels/${id}`)
        .then(res => {
          console.log(res.data);
          if (res.data?.message) {
            Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
            refetch(); // reload data
          }
        })
        .catch(error => {
          console.error(error);
          Swal.fire('Error', 'Failed to delete parcel.', 'error');
        });
    }
  });
};

const handlePayment = (id)=>{
console.log(id)
navigate(`/dashboard/payment/${id}`)

}

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">Error loading parcels</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-base-200 text-base font-semibold">
              <th>#</th>
              <th>Tracking ID</th>
              <th>Product</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="font-mono text-xs">{parcel.trackingId}</td>
                <td>{parcel.product}</td>
                <td>{parcel.type}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <div
                    className={`badge badge-md px-4 py-2 text-white text-center ${
                      parcel.payment_status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  >
                    {parcel.payment_status === 'paid' ? 'Paid' : 'Not Paid'}
                  </div>
                </td>
                <td>
                  <div
                    className={`badge badge-md px-4 py-2 text-white text-center ${
                      parcel.delivery_status === 'delivered'
                        ? 'bg-green-600'
                        : parcel.delivery_status === 'in-transit'
                        ? 'bg-blue-500'
                        : 'bg-gray-600'
                    }`}
                  >
                    {parcel.delivery_status.replace('-', ' ')}
                  </div>
                </td>
                <td>
                  <div className="flex flex-nowrap gap-2 items-center">
                    <button className="btn btn-xs btn-info">Details</button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(parcel._id)}
                    >
                      Delete
                    </button>
                    {parcel.payment_status === 'not-paid' && 
                    (
                      <button onClick={()=> handlePayment(parcel._id)} className="btn btn-xs btn-success">Pay</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
