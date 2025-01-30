import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { getRoomById, updateRoom } from '../utils/ApiFunctions'

const EditRoom = () => {
  const[room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""

   })
const[imagePreview, setImagePreview] = useState("")
const[successMessage, setSuccessMessage] = useState("")
const[errorMessage, setErrorMessage] = useState("")

const{roomId} = useParams()

useEffect(() => {
  const fetchRoom = async () => {
    try {
      const roomData = await getRoomById(roomId)
       setRoom(roomData)
       setImagePreview(roomData.photo)
    } catch (error) {
      console.error(error)
    }
  }
  fetchRoom()
}, [roomId])

const handleImageChange = (e) => {
  const selectedImage = e.target.files[0]
  setRoom({...room, photo: selectedImage})
  setImagePreview(URL.createObjectURL(selectedImage))
}

const handleInputChange = (e) =>{
  const {name, value} = e.target
  setRoom({...room,[name]: value})
}

const handleSubmit = async (e) =>{
  e.preventDefault()
  try {
    const response = await updateRoom(roomId, room)
    if(response.status === 200){
    setSuccessMessage("Room updated successfully!")
    const updatedRoomData = await getRoomById(roomId)
    setRoom(updatedRoomData)
    setImagePreview(updatedRoomData.photo)
    setErrorMessage("")
    }else{
      setErrorMessage("Error updating room")
    }
  } catch (error) {
    console.error(error)
    setErrorMessage(error.message)
  }

}

  return (
        <div className="container mt-5 mb-5">
          <h3 className=" text-center mt-5 mb-5">Edit a New Room</h3>
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                {successMessage &&(
                    <div className="alert alert-success" role="alert">{successMessage}</div>
                )}

                 {errorMessage &&(
                    <div className="alert alert-danger" role="alert">{errorMessage}</div>
                )}


                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="roomType" className="form-label hotel-color"> 
                        RoomType
                        </label>
                        <input
                         className="form-control"
                         required
                         id ="roomType"
                         name ="roomType"
                         type="text"
                         value={room.roomType}
                         onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="roomPrice" className="form-label hotel-color"> 
                        RoomPrice
                        </label>
                        <div className="col-sm-10">
                        <input
                         className="form-control"
                         required
                         id ="roomPrice"
                         name ="roomPrice"
                         type="number"
                         value={room.roomPrice}
                         onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="photo" className="form-label hotel-color"> 
                        Photo
                        </label>
                        <input
                        required
                        className="form-control"
                        id = "photo"
                        name= "photo"
                        type="file"
                        onChange={handleImageChange}
                        />
                        
                        {imagePreview && (
                         <img src ={`data:image/jpeg;png;base64,${imagePreview}`}
                          alt="Preview Room photo'"
                          style={{maxWidth:"400px", maxHeight:"400"}}
                          className="mb-3"/>
                        )}
                        
                    </div>
                    <div className="d-grid gap-3 d-md-flex mt-2">
                      <Link to={"/existing-room"} className='btn btn-outline-info ml-5'>
                        back
                      </Link>
                        <button type="submit" className="btn btn-outline-warning">
                            Save Update
                        </button>

                    </div>

                </form>
            </div>
          </div>
        </div>
   )
}
export default EditRoom