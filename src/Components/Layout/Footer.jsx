import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="sid-footer">
      <div className="sid-footer__top">
        <Container>
          <Row>
            <Col xs={12}>
              <h5 className="sid-footer__title color-black text-uppercase customFontThree">
                LET'S TALK
              </h5>
              <p className="sid-footer__tag color-black text-uppercase customFontOneRegular text-6xl font-thin">
                ON TRAVAILLE ENSEMBLE ?
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sid-footer__bottom">
        <Container>
          <Row>
            <Col xs={4}>
              <p className="text-uppercase color-white font-bold text-xl customFontOneBold w-75">DIRECTRICE ARTISTIQUE — UI/UX DESIGNER — GRAPHIC DESIGNER EN FREELANCE - BASÉE EN FRANCE</p>
            </Col>
            <Col xs={4}>
              <p className="color-white font-bold text-3xl customFontOneBold w-75">
                Un projet en tête ? N'hésitez pas à me contacter !
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
