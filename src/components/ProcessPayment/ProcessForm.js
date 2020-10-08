import React from 'react';

import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';

const ProcessForm = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setPaymentError(error)
      setPaymentSuccess(null)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setPaymentError(null)
      setPaymentSuccess(paymentMethod)
      handlePayment(paymentMethod.id)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
          paymentError && <p style={{color: 'red'}}>{paymentError.message}</p>
      }
      {
          paymentSuccess && <p style={{color: 'green'}}>{paymentSuccess.id}</p>
      }
    </form>

  );
};

export default ProcessForm;