import React, { useEffect, useState } from 'react'
import {cancelBooking, getAllBookings} from "../utils/ApiFunctions";
import { set } from 'date-fns';
import Header from '../common/Header';
import BookingTable from './BookingTable';
import { useParams } from "react-router-dom";

const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[errorMessage, setErrorMessage] = useState("")

    // const [bookingId] = useParams()

    useEffect(() =>{
        setTimeout(()=>{
            getAllBookings().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) =>{
                setErrorMessage(error.message)
                setIsLoading(false)
            })
        },1000)
    },[])

    const handleBookingCancellation = async(bookingId) =>{
        try {
            await cancelBooking(bookingId)
            const updatedBookings = await getAllBookings()
            setBookingInfo(updatedBookings)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
  return (
    <div style={{backgroundColor: "whitesmoke"}}>
        <Header title={"Existing bookings"}/>
        {errorMessage && <div className='text-danger'>{errorMessage}</div>}
        {isLoading ? (
            <div>
              Loading Existing bookings....
            </div>
        ): (
            <BookingTable 
             bookingInfo={bookingInfo}
             handleBookingCancellation={handleBookingCancellation}
            />
        )}
    </div>
  )
}

export default Bookings