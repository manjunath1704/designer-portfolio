import { Container, Row, Col } from "react-bootstrap";

const Hero = ({ heroTitle, heroDesc, backgroundImage }) => {
  return (
    <section
      className="sid-pvHero  d-flex align-items-center position-relative"
      style={{backgroundImage:`url(${backgroundImage})`}}
    >
      <Container className="sid-pvHero__container"> 
        <Row>
          <Col lg={8}>
            <h1 className="sid-font__head text-5xl text-lg-9xl font-bold mb-2 text-uppercase color-white">
              {heroTitle}
            </h1>
            <p className="sid-font__body text-xl text-lg-2xl font-semibold mb-0 color-white">
              {heroDesc}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Hero;
