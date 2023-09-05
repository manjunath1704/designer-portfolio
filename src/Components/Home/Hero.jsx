import React  from 'react';
import { Container, Row, Col } from "react-bootstrap"

const Hero = () => {
  return(
    <section className="overflow-hidden sid-hero d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col xs={12} className="text-center color-white">
           <h6>Hello there, I am</h6>
           <h4>Siddhi Parkar</h4>
           <p>UI UX Designer</p>
           <p>Freelancer based in Mumbai, India</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Hero;