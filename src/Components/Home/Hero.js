import { Container, Row, Col } from "react-bootstrap"

const Hero = () => {
  return(
    <section>
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <h1 className="customFontOneBold text-md">Florence Beckel  —  Freelance située à Metz en France</h1>
            <h3 className="customFontOneBold">DIRECTRICE ARTISTIQUE</h3>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Hero;