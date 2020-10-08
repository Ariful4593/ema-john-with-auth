import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProcessForm from './ProcessForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HZp7VIFvbZO7xjYzMuCl9Dg8ITpUsSOwQX6LSfH45broJINKMrTNjw0Ls4TvaruUP9P94xnOO3fX3pXcQeJ1mkp00YyPWDvqq');

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
        <ProcessForm handlePayment={handlePayment}></ProcessForm>
    </Elements>
  );
};

export default ProcessPayment;