import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    let today = new Date()
  return (
    <footer className='by-dark text-light py-3 footer mt-lg-5'>
        <Container>
            <Row>
                <Col xl={12} md={12} className='text-center'>
                    <p>&copy; {today.getFullYear()} Miracle Hotel</p>
                </Col>
            </Row>
        </Container>

    </footer>
  )
}

export default Footer