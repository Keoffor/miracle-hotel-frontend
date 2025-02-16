
import Header from '../common/Header'

const BookingSuccess = () => {
  const message = localStorage.getItem("confirmationCode");

  console.log("checking-success:::::::: ",message )
  return (
    <div className='container'>
        <Header title={"Booking Success"}/>
        <div className='mt-5'>
            <div>
                <h3 className='text-success'>Booking Success !</h3>
                <p className='text-success'>{message}</p>
            </div>
       </div>

    </div>
  )
}

export default BookingSuccess