import React  from 'react';
import { Container, Row, Col } from "react-bootstrap"
import AnimatingElement from '../Global/AppearingAnimation';

const Hero = () => {
  return(
    <section className="overflow-hidden sid-hero d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col xs={12} className="text-center color-white">
            <AnimatingElement>
           <h6 className='sid-font__body text-2xl text-lg-4xl font-regular'>Hello there, I am</h6>
           <h4 className='sid-font__head text-5xl text-lg-9xl font-light my-4 text-uppercase'>Siddhi Parkar</h4>
           <p className='sid-font__body text-2xl text-lg-4xl font-semibold'>UI UX Designer</p>
           <p className='sid-font__body text-xl text-lg-3xl font-regular opacity-50 mt-4'>Freelancer based in Mumbai, India</p>
           </AnimatingElement>
          </Col>
        </Row>
         
          <img src="/assets/waving-hand.gif" className='sid-hero__video' alt="" />
      </Container>
    </section>
  )
}
export default Hero;