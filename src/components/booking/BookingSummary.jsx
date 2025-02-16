import moment from "moment";
import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { createInitialOrderRequest } from "../utils/interface/OrderRequestInterface";

const BookingSummary = ({ booking, payment, isFormValid,roomId,roomType }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const noOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
 
  const[orderRequest, setOrderRequest] = useState(createInitialOrderRequest())
    
    useEffect(() => {
    }, [orderRequest]);

    

  const handleConfirmCheckOut = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      handleCheckOut()
    }, 3000);
  };


  const handleCheckOut = async () => {
    setOrderRequest(prevState => {
      const updatedOrder = {
        ...prevState,
        guestFullName: booking.guestFullName,
        guestEmail: booking.guestEmail,
        bookedRooms: [{
          roomId: roomId,
          roomType: roomType,
          amount: payment,
          noOfDays: noOfDays,
          currency: "USD"
        }]
      };

    setTimeout(() => {
      navigate("/checkout", { state: { orderRequestData: updatedOrder, isclickedData: true } });
    }, 100);  // Small delay for React state update
    
    return updatedOrder;
  });        
  };

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
            <Button variant="success" onClick={handleConfirmCheckOut}>
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
                "Confirm booking and Go to Checkout"
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
