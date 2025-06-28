import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading';
import { FaCheckCircle } from 'react-icons/fa'; // ✅ You forgot this import

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const AxiosSecure = UseAxiosSecure();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // ✅ Ensures email is available before fetching
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      {payments.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Parcel ID</th>
              
                <th className="px-4 py-2">Amount (৳)</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((payment, index) => (
                <tr key={payment.transactionId} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{payment.parcelId}</td>
                
                  <td className="px-4 py-2">৳{payment.amount}</td>
                  <td className="px-4 py-2 text-blue-600 font-medium">{payment.transactionId}</td>
                  <td className="px-4 py-2 capitalize">
                    {Array.isArray(payment.paymentMethod)
                      ? payment.paymentMethod.join(', ')
                      : payment.paymentMethod}
                  </td>
                  <td className="px-4 py-2 text-green-600 flex items-center gap-1">
                    <FaCheckCircle /> Paid
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No payment history available.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
