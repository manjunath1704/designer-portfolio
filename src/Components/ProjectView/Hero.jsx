import { Container, Row, Col } from "react-bootstrap";

const Hero = () => {
  return(
    <section className="sid-pvHero  d-flex align-items-center">
      <Container>
        <Row>
          <Col lg={8}>
            <h1 className="sid-font__head text-5xl text-lg-9xl font-bold mb-2 text-uppercase color-black">Customizing Material</h1>
            <p className="sid-font__body text-xl text-lg-3xl font-bold mb-0">Customization creates unique branded products with familiar patterns and accessible interactions</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Hero;