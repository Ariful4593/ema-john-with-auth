import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import { useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  
  const onSubmit = data => {
    setUserData(data)
    console.log('form submitted', data)
  };

  const handlePayment = (id) => {
    const selectedItem = getDatabaseCart();
    const orderTime = new Date();
    const orderDetails = {...userData, id, loggedInUser, selectedItem, orderTime}
    console.log(orderDetails)
    fetch('http://localhost:4000/addOrder', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(orderDetails)
    })

  }
  
  
  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{display: userData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
          {errors.phone && <span className="error">Phone Number is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: userData ? 'block' : 'none'}} className="col-md-6 mt-4">
        <ProcessPayment handlePayment={handlePayment}></ProcessPayment>
      </div>
    </div>

  );
};

export default Shipment;