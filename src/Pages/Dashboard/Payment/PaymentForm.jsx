import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = ({parcelId}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error,setError] = useState('')
    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!stripe || !elements){
            return
        }
      
    
        const card = elements.getElement(CardElement)
        if(!card){
            return 
        }

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            setError(error.message)
        }
        else{
            setError('')
            console.log('PaymentMethod',paymentMethod)
        }

    

    }
    
    return (
        <div className="max-w-md mx-auto card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Make a Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full text-black"
        >
          Payment to Proceed
        </button>

       {
       error && <p className="text-red-500 font-medium">{error}</p>
       }
       
      </form>
    </div>
    );
};

export default PaymentForm;