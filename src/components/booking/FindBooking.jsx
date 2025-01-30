import React, { useState } from "react";
import Room from "../room/Room";
import { gu } from "date-fns/locale";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import { useParams } from "react-router-dom";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("")
  const {bookingId} = useParams();
  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    room: { id: "" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  });

  const clearBookingInfo = {
    bookingId: "",
    room: { id: "" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(response);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
        
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingInfo.bookingId);
      setIsDeleted(true);
      setSuccessMsg("Booking has been successfully cancelled")
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("")
      setError("")
    } catch (error) {
      setError(error.response);
    }
    setTimeout(() =>{
      setSuccessMsg("")
      setIsDeleted(false)
    },3000)
  };

  return (
    <>
      <div
        className="container mt-5 d-flex flex-column 
            justify-content-center align-items-center"
      >
        <h2>Find my booking </h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              type="text"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter your booking confirmation code"
            />
            <button className="btn btn-hotel input-group-text">
              Find booking
            </button>
          </div>
        </form>
        {isLoading ?(
            <div>Finding booking....</div>
        ): error ? (
            <div className="text-danger">
                {error}
            </div>
        ): bookingInfo.bookingConfirmationCode ? (
            <div className="col-md-6 mt-4 mt-b">
                <h3>Booking information</h3>
                <p className="summary-text">Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
                <p className="summary-text">Booking Id: {bookingInfo.bookingId}</p>
                <p className="summary-text">Room Number : {bookingInfo.room.id}</p>
                <p className="summary-text">Room Type : {bookingInfo.room.roomType}</p>
                <p className="summary-text">Check-In Date : {bookingInfo.checkInDate}</p>
                <p className="summary-text">Check-out Date : {bookingInfo.checkOutDate}</p>
                <p className="summary-text">Full Name : {bookingInfo.guestFullName}</p>
                <p className="summary-text">Email Address : {bookingInfo.guestEmail}</p>
                <p className="summary-text">Adults : {bookingInfo.numOfAdults}</p>
                <p className="summary-text">Children : {bookingInfo.numOfChildren}</p>
                <p className="summary-text">Total Guest: {bookingInfo.totalNumOfGuest}</p>
                {!isDeleted &&(
                    <button
                    className="btn btn-danger"
                    onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                    >
                        Cancel Booking
                    </button>
                )}
            </div>
        ):(
            <div>find booking...</div>
        )}
        {isDeleted && (
            <div className="alert alert-success mt-3" role="alert ">
                {successMsg}
            </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
