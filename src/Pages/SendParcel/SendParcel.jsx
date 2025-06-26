import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const SendParcel = () => {
  const { register, handleSubmit, watch } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const serviceData = useLoaderData();

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const parcelType = watch("type");

  const generateTrackingId = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TRK-${date}-${randomPart}`;
  };

  const onSubmit = (data) => {
    const isSameDistrict = data.senderServiceCenter === data.receiverServiceCenter;
    const weight = parseFloat(data.weight) || 0;

    let baseCost = 0;
    let extraWeightCost = 0;
    let outsideFee = 0;

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
      } else {
        const extraKg = weight - 3;
        extraWeightCost = extraKg * 40;
        baseCost = isSameDistrict ? 110 : 150;
        if (!isSameDistrict) outsideFee = 40;
      }
    }

    const totalCost = baseCost + extraWeightCost + outsideFee;
    const trackingId = generateTrackingId();

    const saveData = {
      ...data,
      cost: totalCost,
      trackingId,
      creation_date: new Date().toISOString(),
      created_by: user?.email,
      payment: 'not-paid',
      delivery_status: 'not-collected',
    };

    Swal.fire({
      icon: 'question',
      title: 'Confirm Parcel?',
      html: `
        <div style="text-align: left">
          <p><strong>Parcel Type:</strong> ${data.type}</p>
          <p><strong>Weight:</strong> ${weight} kg</p>
          <p><strong>Base Cost:</strong> ৳${baseCost}</p>
          <p><strong>Extra Weight Cost:</strong> ৳${extraWeightCost}</p>
          ${outsideFee > 0 ? `<p><strong>Outside District Fee:</strong> ৳${outsideFee}</p>` : ''}
          <hr />
          <p><strong>Total Cost:</strong> <span style="color:green;font-size:18px;">৳${totalCost}</span></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: '💳 Continue with Payment',
      cancelButtonText: '✏️ Edit Parcel Info',
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d97706',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/parcels', saveData)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: 'success',
                title: 'Parcel Saved Successfully!',
                html: `
                  <p><strong>Tracking ID:</strong> ${trackingId}</p>
                  <p><strong>Total Cost:</strong> ৳${totalCost}</p>
                `,
                showCancelButton: true,
                confirmButtonText: '💳 Proceed to Payment',
                cancelButtonText: 'Close',
                confirmButtonColor: '#16a34a',
                cancelButtonColor: '#d33',
              }).then(result => {
                if (result.isConfirmed) {
                  console.log("➡️ Redirect to payment... (to be implemented)");
                }
              });
            }
          })
          .catch(error => {
            console.error("❌ Parcel Save Failed:", error);
            Swal.fire('Error', 'Something went wrong while saving the parcel.', 'error');
          });
      } else {
        console.log("📝 User chose to edit parcel info.");
      }
    });
  };

  const regions = [...new Set(serviceData.map(item => item.region))];

  const getServiceCenters = (region) => {
    return serviceData.filter(item => item.region === region).map(item => item.district);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-2">Send a Parcel</h2>
      <p className="mb-4 text-gray-600">Door to Door Delivery</p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        {/* Parcel Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Parcel Info</h3>
          <select {...register("type", { required: true })} className="select select-bordered w-full mb-2">
            <option value="">Select Type</option>
            <option value="document">Document</option>
            <option value="non-document">Non-document</option>
          </select>

          <input {...register("product", { required: true })} placeholder="Parcel Product" className="input input-bordered w-full mb-2" />

          {parcelType === "non-document" && (
            <input
              {...register("weight", { required: true, min: 0.1 })}
              type="number"
              step="any"
              placeholder="Weight (kg)"
              className="input input-bordered w-full"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Sender Info</h3>
            <input {...register("senderName", { required: true })} placeholder="Sender Name" className="input input-bordered w-full mb-2" />
            <input {...register("senderContact", { required: true })} placeholder="Contact" className="input input-bordered w-full mb-2" />
            <select {...register("senderRegion", { required: true })} className="select select-bordered w-full mb-2">
              <option value="">Select Region</option>
              {regions.map((region, i) => <option key={i} value={region}>{region}</option>)}
            </select>
            <select {...register("senderServiceCenter", { required: true })} className="select select-bordered w-full mb-2">
              <option value="">Select Service Center</option>
              {getServiceCenters(senderRegion).map((center, i) => <option key={i} value={center}>{center}</option>)}
            </select>
            <input {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered w-full mb-2" />
            <input {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="input input-bordered w-full" />
          </div>

          {/* Receiver Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Receiver Info</h3>
            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full mb-2" />
            <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input input-bordered w-full mb-2" />
            <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full mb-2">
              <option value="">Select Region</option>
              {regions.map((region, i) => <option key={i} value={region}>{region}</option>)}
            </select>
            <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered w-full mb-2">
              <option value="">Select Service Center</option>
              {getServiceCenters(receiverRegion).map((center, i) => <option key={i} value={center}>{center}</option>)}
            </select>
            <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered w-full mb-2" />
            <input {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input input-bordered w-full" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default SendParcel;
