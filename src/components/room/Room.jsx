import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import RoomCard from './RoomCard'
import { Col } from 'react-bootstrap'
import { Container, Row } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'

const Room = () => {
    const [data, setData] = useState([{id: "", roomType: "", roomPrice: ""}])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(5)
    const [filterData, setFilteredData]= useState([{id:"", roomType: "", roomPrice: ""}])

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((res) => {
            setData(res);
            setFilteredData(res); // Use setFilteredData to update the state
            setIsLoading(false);
        }).catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);
    

    if(isLoading) {
        return <div className="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div className="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
    }
    if(error) {
        return <div className='text-danger'>Error: {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const totalPages = Math.ceil(filterData.length / roomsPerPage)

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage
        const endIndex = startIndex + roomsPerPage
        return filterData
        .slice(startIndex, endIndex)
        .map((room) => 
        <RoomCard key={room.id} room={room}/>)
    }

  return (
    <Container>
        <Row>
            <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={data} selectedFilteredData={setFilteredData}/>
            </Col>
        </Row>
        <Row>{renderRooms()}</Row>
        <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
                <RoomPaginator 
                 currentPage={currentPage}
                 totalPages={totalPages}
                 onPageChange={handlePageChange}
                />
            </Col>
        </Row>

    </Container>
  )
}

export default Room