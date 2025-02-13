import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createInitialOrderRequest, createInitialOrderResponse, paymentCheckout } from './utils'; // Adjust the import according to your setup

const CheckoutBookedRoom = () => {
  const location = useLocation();
  const orderLocation = location.state?.orderRequestData || createInitialOrderRequest(); // Fallback to initial state if undefined
  const isClicked = location.state?.isClickedData || false;
  const errorMsg = location.state?.error || '';

  const [orderCheckoutRequest, setOrderCheckoutRequest] = useState(orderLocation);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderResponse, setOrderResponse] = useState(createInitialOrderResponse());
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrderCheckoutRequest(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleRoomInput = (index) => {
    const { name, value } = e.target;
    const updatedRooms = orderCheckoutRequest.bookedRooms.map((room, i) => 
      i === index ? { ...room, [name]: value } : room
    );
    setOrderCheckoutRequest(prevState => ({
      ...prevState,
      bookedRooms: updatedRooms
    }));
  };

  useEffect(() => {
    paymentCheckout(orderCheckoutRequest).then((res) => {
      if (res.status === "SUCCESS") {
        setOrderResponse(res);
        setError("");
      } else {
        setError(errorMsg);
        setOrderResponse(createInitialOrderResponse());
      }
      console.log("OrderRequest ", orderCheckoutRequest);
    });
  }, [orderCheckoutRequest, errorMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isClicked) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
      setIsValidated(true);
      redirectCheckOut();
    }
  };

  const redirectCheckOut = () => {
    try {
      if (orderResponse) {
        window.location.href = orderResponse.stripeUrl;
      } else {
        setError(error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <section>
        <div className="row">
          <OrderSummary />
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Guest Billing address</h4>
            <form className="needs-validation" noValidate validated={isValidated} onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-6">
                  <label htmlFor="guestFullName" className="form-label label-text">Guest Fullname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestFullName"
                    placeholder=""
                    value={orderCheckoutRequest.guestFullName}
                    required
                  />
                  <div className="invalid-feedback">Valid first name is required.</div>
                </div>
                
                <div className="col-6">
                  <label htmlFor="guestEmail" className="form-label label-text">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestEmail"
                    value={orderCheckoutRequest.guestEmail}
                  />
                </div>

                {orderCheckoutRequest.bookedRooms.map((room, index) => (
                  <div key={index} className="col-12">
                    <div className="row g-3">
                      <div className="col-6">
                        <label htmlFor={`roomType-${index}`} className="form-label label-text">Room Type</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`roomType-${index}`}
                          name="roomType"
                          value={room.roomType}
                          onChange={(e) => handleRoomInput(e, index)}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor={`roomPrice-${index}`} className="form-label label-text">Total Payment</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`roomPrice-${index}`}
                          name="roomPrice"
                          value={room.roomPrice}
                          onChange={(e) => handleRoomInput(e, index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="col-12">
                  <label htmlFor="street" className="form-label label-text">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    placeholder="1234 Main St"
                    value={orderCheckoutRequest.address.street}
                    onChange={handleInput}
                    required
                  />
                  <div className="invalid-feedback">Please enter your billing address.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label label-text">
                    Address 2 <span className="text-body-secondary">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label label-text">State</label>
                  <select
                    className="form-select"
                    id="state"
                    value={orderCheckoutRequest.address.state}
                    required
                  >
                    <option value="">Choose...</option>
                    <option>California</option>
                    <option>Texas</option>
                    <option>New Jersey</option>
                    <option>North Carolina</option>
                    <option>Wisconsin</option>
                  </select>
                  <div className="invalid-feedback">Please provide a valid state.</div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zipCode" className="form-label label-text">Zip</label>
                  <input
                    type="text"
                    className="form