import React, { useEffect, useState } from 'react'
import { parseISO } from 'date-fns'
import DataSlider from '../common/DataSlider'

const BookingTable = ({bookingInfo,handleBookingCancellation}) => {
    const[filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBooking = (startDate, endDate) => {
        let filtered = bookingInfo;
        if(startDate && endDate){
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate =  parseISO(booking.checkInDate)
                const bookingEndDate =  parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(()=>{
        setFilteredBookings(bookingInfo)

    },[bookingInfo])
  return (
    <>
        <section className='p-4'>
        <DataSlider onDateChange={filterBooking} onFilterchange={filterBooking}/>
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking Id</th>
                        <th>Room Id</th>
                        <th>Room Type</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.map((booking, index)=>(
                        <tr key={booking.bookingId}>
                            <td>{index+1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button
                                className='btn btn-danger btn-sm'
                                onClick={()=> handleBookingCancellation(booking.id)}
                                >
                                Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filterBooking.length === 0 && <p>No Booking Found for the selected dates</p>}
        </section>
    </>
  )
}

export default BookingTable