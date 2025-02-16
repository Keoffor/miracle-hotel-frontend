import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import { useLocation } from "react-router-dom";
import { paymentCheckout } from "../utils/ApiFunctions";
import { createInitialOrderRequest } from "../utils/interface/OrderRequestInterface";

const CheckoutBookedRoom = () => {
  const location = useLocation();

  const orderLocation = location.state?.orderRequestData || createInitialOrderRequest();
  const errorMsg = location.state?.error || '';


  const[orderCheckoutRequest, setOrderCheckoutRequest] = useState(orderLocation)
  const[isSubmitted, setIsSubmitted] = useState(false);
  const[isClicked, setIsClicked]= useState(false);

  const [error, setError]= useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrderCheckoutRequest((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };
  // const handleBookedRoomsInput = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedRooms = orderCheckoutRequest.bookedRooms.map((room, i) => 
  //     i === index ? { ...room, [name]: value } : room
  //   );
  //   setOrderCheckoutRequest(prevState => ({
  //     ...prevState,
  //     bookedRooms: updatedRooms
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
        e.stopPropagation();
    } else {
        setIsSubmitted(true);
        await processPayment();
    }
};

const processPayment = async () => {
  setIsClicked(true);
  sessionStorage.setItem("paymentDTo",JSON.stringify(orderCheckoutRequest) );
  await paymentCheckout(orderCheckoutRequest).then((res) => {
      try {
          if (res.status === "INITIATE_PAYMENT") {
              window.location.href = res.stripeUrl;
              setError("");
          } else {
              setError(errorMsg);
          }
      } catch (error) {
          setError("An error occurred while processing payment.");
      }
  });
};


  return (
    <>
     
        <div className="container mt-5">
          <section>
            <div className="row">
              <OrderSummary/>
              <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Guest Billing address</h4>
                <form className="needs-validation" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-6">
                      <label 
                          htmlFor="guestFUllName" 
                          className="form-label label-text">
                       Guest Fullname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="guestFullname"
                        placeholder=""
                        value={orderCheckoutRequest?.guestFullName|| ""}
                        readOnly
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    
                    <div className="col-6">
                      <label htmlFor="guestEmail" className="form-label label-text">
                        Email{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="guestEmail"
                        value={orderCheckoutRequest?.guestEmail|| ""}
                        readOnly
                      />
                    </div>
                    {orderCheckoutRequest.bookedRooms?.map((room, index) => (
                      <React.Fragment key={index}>
                    <div className="col-6">
                      <label htmlFor="roomType" className="form-label label-text">
                        RoomType
                      </label>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          className="form-control "
                          id={`roomType-${index}`}
                          name="roomType"
                          value={room?.roomType||""}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-6">
                   
                      <p  className="total-text mt-3" ><strong>Total Payment: </strong>${room?.amount||""}
                    </p>
                    </div>
                    </React.Fragment>
                    ))}

                    <div className="col-12">
                      <label htmlFor="address" className="form-label label-text">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        placeholder="1234 Main St"
                        value={orderCheckoutRequest?.address?.street || ""}
                        onChange={handleInput}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your billing address.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="form-label label-text">
                        Address 2{" "}
                        <span className="text-body-secondary">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="state" className="form-label label-text">
                        State
                      </label>
                      <select className="form-select" name="state" 
                      id="state" 
                      value={orderCheckoutRequest?.address?.state || ""} 
                      onChange={handleInput}
                      required>
                        <option value="">Choose...</option>
                        <option>California</option>
                        <option>Texas</option>
                        <option>New Jersey</option>
                        <option>North Caroline</option>
                        <option>Wiscousin</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="zipCode" className="form-label label-text">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        name="zipCode"
                        value={orderCheckoutRequest.address?.zipCode || ""}
                        onChange={handleInput}
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="form-check">
                    <label className="form-check-label">
                      This room will be ready for check-in immediately after the billing process
                    </label>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-lg btn btn-success"
                    type="submit"
                  >
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
    </>
  );
};

export default CheckoutBookedRoom;
