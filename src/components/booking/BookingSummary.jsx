import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const noOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success")
    }
  }, [isBookingConfirmed, navigate]);
  return (
    <div className="card card-body mt-5 justify-content-center">
      <h4>Reservation Summary</h4><br/><b/>
      <p className="summary-text">
        Fullname : <strong>{booking.guestFullName}</strong>
      </p>
      <p className="summary-text">
        Email : <strong>{booking.guestEmail}</strong>
      </p>
      <p className="summary-text">
        Check-In Date :
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>
      <p className="summary-text">
        Check-Out Date :
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>
      <p className="summary-text">
        Number of Days : <strong>{noOfDays}</strong>
      </p>
      <div >
        <h5 className="summary-text">Number of Guest</h5>
        <strong>
          <p className="summary-text">Adult{booking.numOfAdults > 1 ? "s" : ""} :{" "}
          {booking.numOfAdults}
        </p></strong >
        <strong><p className="summary-text">Children : {booking.numOfChildren}</p></strong>
      </div>
      {payment > 0 ? (
        <>
          <p className="summary-text">
            Total Payment : <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-5"
                    role="status"
                    aria-hidden="true"
                  ></span>
                     Booking confirmed, redirecting to payment ....
                </>
              ) : (
                "Confirm booking and proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">loading</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger">
          Check-Out date must be after Check-In date
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
