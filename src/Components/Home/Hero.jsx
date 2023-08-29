import React  from 'react';
import { Container, Row, Col } from "react-bootstrap"

const Hero = () => {
  return(
    <section className="overflow-hidden">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <h1 className="customFontOneBold text-2xl text-lg-4xl font-bold mt-10">Florence Beckel  —  Freelance située à Metz en France</h1>
            <h3 className="customFontThree sid-hero__title font-bold mt-6">DIRECTRICE ARTISTIQUE</h3>
            <h2 className="customFontThree  d-flex align-items-center justify-content-center"><div className="sid-hero__title-outlined sid-hero__title-outlined--lg me-2">& </div><div className="sid-hero__title-outlined sid-hero__title-outlined--md">UI/UX</div> <div className="sid-hero__title-outlined sid-hero__title-outlined--sm">DESIGER</div></h2>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Hero;