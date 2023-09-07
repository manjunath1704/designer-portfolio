import React  from 'react';
import { Container, Row, Col } from "react-bootstrap"

const Hero = () => {
  return(
    <section className="overflow-hidden sid-hero d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col xs={12} className="text-center color-white">
           <h6 className='sid-font__body text-4xl font-regular'>Hello there, I am</h6>
           <h4 className='sid-font__name text-9xl font-light my-4'>Siddhi Parkar</h4>
           <p className='sid-font__body text-4xl font-semibold'>UI UX Designer</p>
           <p className='sid-font__body text-3xl font-regular opacity-50 mt-4'>Freelancer based in Mumbai, India</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Hero;