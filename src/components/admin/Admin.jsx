import React from 'react'
import { Link } from 'react-router-dom'


const Admin = () => {
  return (
    <>
    <section className='container mt-5 summary-text'>
        <h2 className='text-center'>Welcome to Admin</h2>
        <hr/>
        <Link to={"/existing-room"} > Manage Rooms</Link><br/><br/>
        <Link to={"/existing-booking"}> Manage Bookings</Link>
    </section>
    </>
  )
}

export default Admin