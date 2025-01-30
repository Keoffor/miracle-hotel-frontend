import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousel = () => {
  const [rooms, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRoom(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div className="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
    );
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>
  }

  return (
    <section className="bg-light mt-5 mb-5 shadow summary-text">
      <Link to={"/browse-all-rooms"} className="hotel-color">
        Browse All Rooms
      </Link>
      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 3, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-5" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/bookings/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/jpeg;png;base64,${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "auto" }}
                        />
                      </Link>
                      <Card.Body>
                          <Card.Title className="hotel color">{room.roomType}</Card.Title>
                          <Card.Title className="room-price">{room.roomPrice} / night</Card.Title>
                        <div className="flex-shrink-0">
                        <Link to={`/bookings/${room.id}`} className='btn btn-hotel btn-sm'>
                            Book now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  )
};

export default RoomCarousel;
