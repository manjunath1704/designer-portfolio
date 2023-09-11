import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import SocialMedia from "../Global/SocialMedia";
const logoLight = "./assets/logo/logo-light.webp";

const Footer = () => {
  return (
    <footer className="sid-footer">
      <div className="sid-footer__top">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="d-flex align-items-center text-3xl text-sm-5xl text-lg-7xl mb-5">
                <h5 className="color-black text-3xl text-lg-9xl sid-font__head  mb-0">
                  LET'S CONNECT
                </h5>
                <a
                  href="#"
                  className="ms-4 ms-lg-5 rounded-circle bg-light d-flex justify-content-center align-items-center sid-footer__cbutton"
                >
                  <BsArrowRight className="" />
                </a>
              </div>

              <p className="color-black text-3xl text-lg-5xl sid-font__head">
                On your project ?
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sid-footer__bottom">
        <Container>
          <Row className=" text-center">
            <Col>
              <h4 className="sid-font__head text-uppercase text-2xl text-lg-4xl font-light color-white  my-lg-4">
                Siddhi Parkar
              </h4>
              <SocialMedia iconSize="text-4xl text-lg-8xl" />
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
