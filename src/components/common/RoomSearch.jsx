import moment from 'moment'
import React, { useState } from 'react'
import { getAvailableRooms } from '../utils/ApiFunctions'
import { Button, Col, Container, Form, Row, FormControl } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchResult from './RoomSearchResult'

const RoomSearch = () => {
    const[searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    })

    const[erroMessage, setErrorMessage] = useState("")
    const[availableRooms, setAvailableRooms] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    const handleSearchInput = (e) => {
        e.preventDefault()
        const  checkIn =  moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        if(!checkIn.isValid || !checkOut.isValid){
            setErrorMessage("Pleae, enter valid date range")
            return
        }
        if(!checkOut.isSameOrAfter(checkIn)){
            setErrorMessage("Check-In date must come before Check-out Date")
            return
        }
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((response) => {
                setAvailableRooms(response)
                setTimeout(() => {
                    setIsLoading(false)
                })
            }).catch((error) =>{
                setErrorMessage(error.message)
            }).finally(() =>{
                setIsLoading(false)
            })
        }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        const newSearchQuery = { ...searchQuery, [name]: value };
        setSearchQuery(newSearchQuery);
        const checkIn = moment(newSearchQuery.checkInDate)
        const checkOut = moment(newSearchQuery.checkOutDate)

        if(checkIn.isValid() && checkOut.isValid()){
            setErrorMessage("")
        }
    }
    const onClearSearch = () =>{
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        })
        setAvailableRooms([])
    } 
  return (
    <>
       <Container className='mt-5 mb-5 py-5 shadow'>
            <Form onSubmit={handleSearchInput}>
                <Row className="justify-content-center">
                    <Col xs={12} md={3}>
                        <Form.Group  controlId='checkInDate'>
                            <Form.Label>Check-In Date</Form.Label>
                            <FormControl
                             type='date'
                             name='checkInDate'
                             value={searchQuery.checkInDate}
                             onChange={handleInputChange}
                             min={moment().format('YYYY-MM-DD')}
                            
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group controlId='checkOutdate'>
                            <Form.Label>Check-Out Date</Form.Label>
                            <FormControl
                             type='date'
                             name='checkOutDate'
                             value={searchQuery.checkOutDate}
                             onChange={handleInputChange}
                             min={moment().format('YYYY-MM-DD')}
                            
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Label>RoomType</Form.Label>
                          <div className='d-flex'>
                            <RoomTypeSelector
                             handleRoomInputChange={handleInputChange}
                             newRoom={searchQuery.roomType}
                            />
                            <Button
                             variant='secondary'
                             type='submit'
                             className='ml-2 custom-room-selector'
                            >
                                Search
                            </Button>
                          </div>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {isLoading ? (
                <p className='mt-4'>finding available rooms....</p>
            ): availableRooms ? (
                <RoomSearchResult
                    results={availableRooms}
                    onClearSearch={onClearSearch}

                />
            ):(
                <p className='mt-4'>no rooms available for the selected dates and room type</p>
            )}
            {erroMessage && <p className='text-danger'>{erroMessage}</p>}
       </Container>
    </>
  )
}

export default RoomSearch