import React, { useState, useEffect } from 'react'
import { getAllRooms, deleteRoom } from '../utils/ApiFunctions'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { Col, Row } from 'react-bootstrap';
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from'react-icons/fa'
import { Link } from'react-router-dom'
const ExistingRooms = () => {
  const[rooms, setRooms] = useState([{id: "", roomType: "", roomPrice: ""}])
  const[currentPage, setCurrentPage]= useState(1)
  const[roomPerPage]=useState(5)
  const[isLoading, setIsLoading] = useState(false)
  const[filteredRooms,setFilteredRooms] = useState([{id: "", roomType: "", roomPrice: ""}])
  const[selectedRoomType, setSelectedRoomType]=useState("")
  const[successMessage, setSuccessMessage]=useState("")
  const[errorMessage, setErrorMessage]= useState("")

    useEffect(() => {
      fetchAllRooms()
    }, [])


  const fetchAllRooms =  async () => {
    setIsLoading(true)
    try {
      const result = await getAllRooms()
      setFilteredRooms(result)
      setIsLoading(false)
      setRooms(result)
      
    } catch (error) {
      setErrorMessage(error.message)
    }
  } 
  useEffect(() => {
    if(selectedRoomType === ""){
      setFilteredRooms(filteredRooms)
    }else{
      const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
      setFilteredRooms(filtered)
    } 
  }, [rooms,selectedRoomType])

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleDelete = async(roomId) => {
    try{
    const response = await deleteRoom(roomId)
     if(response === ""){
        setSuccessMessage(`Room No ${roomId} deleted`)
        fetchAllRooms()
     }else{
       console.error(`Error deleting room with: ${response.message}`)
     }
    }catch(error){
      setErrorMessage(error.message)
    }
    setTimeout(()=>{
      setSuccessMessage("")
      setErrorMessage("")  
    },4000)
  }

  const calculateTotalPages = (filteredRooms, roomPerPage, rooms) => {
    const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
    return Math.ceil(totalRooms / roomPerPage)
  }
  const indexOfLastRoom = currentPage * roomPerPage
  const indexOfFirstRoom = indexOfLastRoom - roomPerPage
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return (
      <>
      <div className='container col-md-8 col-lg-6'>
      {successMessage && <p className='alert alert-success mt-5'>{successMessage}</p>}
      {errorMessage && <p className='alert alert-danger mt-5'>{errorMessage}</p>}

      </div>
      {isLoading ? (<p>Loading Existing rooms...</p>):(
        <>
        <div className='mt-5 mb-5 container'>
          <div className='d-flex justify-content-between mb-3 mt-5'>
            <h2>Existing rooms</h2>
          </div>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <RoomFilter data={rooms} selectedFilteredData={setFilteredRooms} />
            </Col>

            <Col md={6} className='d-flex justify-content-end'>
              <Link to={"/add-room"}> 
                  <FaPlus/> Add New Room
                </Link>
            </Col>
          </Row>
          <table className='table table-bordered table-hover'>
            <thead>
              <tr className='text-center'>
               <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id} className='text-center'>
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className='gap-2'> 
                    <Link to={`/edit-room/${room.id}`}>
                      <span className='btn btn-info btn-sm'>
                        <FaEye/>
                      </span> 
                      <span className='btn btn-warning btn-sm'>
                        <FaEdit/>
                        </span>
                    </Link>
                    <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDelete(room.id)}>
                      <FaTrashAlt/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
           currentPage={currentPage}
           totalPages={calculateTotalPages(filteredRooms, roomPerPage, rooms)}
           onPageChange={handlePaginationClick}
          />
        </div>
        </>
      )}

      </>
    )
}

export default ExistingRooms