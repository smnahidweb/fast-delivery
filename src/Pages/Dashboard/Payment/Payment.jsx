import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { useParams } from 'react-router';


const stripesPromise = loadStripe(import.meta.env.VITE_Payment_key)

const Payment = () => {
    const {parcelId} = useParams()
    return (
        <Elements stripe={stripesPromise} >

            <PaymentForm parcelId={parcelId}></PaymentForm>

        </Elements>
    );
};

export default Payment;