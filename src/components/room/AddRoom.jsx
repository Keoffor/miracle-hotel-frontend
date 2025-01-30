import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'

const AddRoom = () => {
    const[newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""

    })
    const[imagePreview, setImagePreview] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[erroMessage, setErroMessage] = useState("")

    const handleRoomInputChange = (e) =>{
        const name = e.target.name
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
             value = parseInt(value)
             
            }else{
                value = ""
            }
        }
        setNewRoom({...newRoom,[name]: value})
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setSuccessMessage("A new Room was added to the Database")
                setNewRoom({photo: null, roomType: "", roomPrice: ""})
                setImagePreview("")
                setErroMessage("")
            }else{
                setErroMessage("error occurred while addding a new room")
            }
            
        } catch (error) {
            setErroMessage(error.message)
            
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErroMessage("")

        },5000)
    }

  return (
    <>
    <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <h2 className="mt-5 mb-2">Add a New Room</h2>
                {successMessage &&(
                    <div className="alert alert-success fade show ">{successMessage}</div>
                )}

                 {erroMessage &&(
                    <div className="alert alert-danger fade show ">{erroMessage}</div>
                )}


                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="roomType" className="form-label"> 
                        RoomType
                        </label>
                        <div>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="roomPrice" className="col-sm-2 col-form-label"> 
                        RoomPrice
                        </label>
                        <div className="col-sm-10">
                        <input
                         className="form-control"
                         required
                         id ="roomPrice"
                         name ="roomPrice"
                         type="number"
                         value={newRoom.roomPrice}
                         onChange={handleRoomInputChange}
                        />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="photo" className="col-sm-2 col-form-label"> 
                        Photo
                        </label>
                        <div className="col-sm-10">
                        <input
                        className="form-control"
                        id = "photo"
                        name= "photo"
                        type="file"
                        onChange={handleImageChange}
                        />
                        
                        {imagePreview && (
                         <img src ={imagePreview}
                          alt="Preview Room photo'"
                          style={{maxWidth:"400px", maxHeight:"400px"}}
                          className="mb-3"/>
                        )}
                        </div>
                    </div>
                    <div className="d-grid gap-3 d-md-flex mt-2">
                        <Link to={"/existing-room"} className='btn btn-outline-info ml-5'>
                          Back
                        </Link>
                        <button className="btn btn-outline-primary ml-5">
                            Save Room
                        </button>

                    </div>

                </form>
            </div>
        </div>
    </section>
     
    </>
   
  )
}

export default AddRoom