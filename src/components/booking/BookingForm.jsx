import React, { useEffect, useState } from "react";
import { getRoomById, bookRoom  } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import {Form, FormControl, FormLabel} from 'react-bootstrap';
import moment from "moment";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomType, setRoomType] = useState("");
  const currentUser = localStorage.getItem("userId")


  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser,
    customerId: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });



  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
      setRoomType(response.roomType);
    } catch (error) {
      throw new Error(error);
    }
  };

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate,'days');
    const paymentPricePerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPricePerDay
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must come before check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
      
    }
    setIsValidated(true);
  };

  
  const handleBookingSuccess = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      
      if (confirmationCode) {
        localStorage.setItem("confirmationCode", confirmationCode);
        setErrorMsg("");
      } else {
        localStorage.removeItem("confirmationCode");
      }
    } catch (error) {
      // Extract and store error message from backend
      if (error.message) {
        setErrorMsg(error.message); 
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card-title hotel-color"> Reserve Room</h4>

              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestFullName" className="hotel-color label-text">Full Name : </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestFullName"
                    name="guestFullName"
                    value={booking.guestFullName}
                    placeholder="Enter your fullname"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your full name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="guestEmail" className="hotel-color label-text">Email : </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your email
                  </Form.Control.Feedback>
                </Form.Group>
                <fieldset>
                  <h5 style={{textAlign:"left", color:" rgb(169, 77, 123)"}}>Lodging Period</h5>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="checkInDate" className="hotel-color label-text"> 
                        Check-In Date :
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        placeholder="check-In Date"
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-In Date
                      </Form.Control.Feedback>

                      <Form.Label htmlFor="checkOutDate" className="hotel-color label-text">
                        Check-Out Date :
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        placeholder="check-Out Date"
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-out Date
                      </Form.Control.Feedback>
                    </div>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>
                <fieldset >
                  <h5 style={{textAlign:"left", color:" rgb(169, 77, 123)"}}>Number of Guest </h5>
                  <div className="row">
                    <div className="col-6">
                      <FormLabel htmlFor="numOfAdults" className="hotel-color label-text">
                        Adults :
                      </FormLabel>
                      <FormControl
                        required
                        type="number"
                        id="numOfAdults"
                        name="numOfAdults"
                        value={booking.numOfAdults}
                        placeholder="0"
                        min={1}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select at least 1 adult.
                      </Form.Control.Feedback>

                      <FormLabel htmlFor="numOfChildren" className="hotel-color label-text">
                        Children :
                      </FormLabel>
                      <FormControl
                        type="number"
                        id="numOfChildren"
                        name="numOfChildren"
                        value={booking.numOfChildren}
                        placeholder="0"
                        onChange={handleInputChange}
                      />  
                      </div>
                    </div>
                </fieldset>
                <div className="form-group mb-2">
                      <button className="btn btn-hotel" type="submit" onClick={handleBookingSuccess}>Continue</button>
                </div>
              </Form>

            </div>
          </div>
          {errorMsg ? (<strong className="text-danger">{errorMsg}</strong>) :
          <div className="col-md-6">
          {isSubmitted && (
            <BookingSummary 
            booking={booking} 
            payment={calculatePayment()} 
            isFormValid={isValidated}
            roomType ={roomType} 
            roomId={roomId}/>
          )}
        </div>
          }

          
        </div>
        </div>
    </>
  );
};

export default BookingForm;
