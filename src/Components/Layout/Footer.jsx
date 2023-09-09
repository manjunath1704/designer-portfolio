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
              <div className="d-flex align-items-center text-lg-7xl mb-5">
                <h5 className="color-black text-4xl text-lg-9xl sid-font__head ">
                  LET'S CONNECT
                </h5>
               <a href="#" className="ms-5 rounded-circle bg-light d-flex justify-content-center align-items-center" style={{height:"100px",width:"100px"}}>
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
          <Row className="g-4 text-center">
            <Col>
              <h4 className="sid-font__head text-uppercase text-4xl font-light color-white my-4">
                Siddhi Parkar
              </h4>
              <SocialMedia iconSize="text-8xl" />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="13.250005722045898 13.75 236.5 236.5"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        <circle cx="132.5" cy="131.5" r="61.5" fill="black"></circle>
        <rect
          x="128.75"
          y="13.75"
          width="5.5"
          height="236.5"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
        <rect
          x="249.75"
          y="129.25"
          width="5.5"
          height="236.5"
          transform="rotate(90 249.75 129.25)"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
        <rect
          x="213.171"
          y="46.4399"
          width="5.5"
          height="236.5"
          transform="rotate(45 213.171 46.4399)"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
        <rect
          x="217.06"
          y="213.671"
          width="5.5"
          height="236.5"
          transform="rotate(135 217.06 213.671)"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
        <rect
          x="239.277"
          y="83.2684"
          width="5.5"
          height="236.5"
          transform="rotate(67.0022 239.277 83.2684)"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
        <rect
          x="180.232"
          y="239.777"
          width="5.5"
          height="236.5"
          transform="rotate(157.002 180.232 239.777)"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
        <rect
          x="242.284"
          y="173.445"
          width="5.5"
          height="236.5"
          transform="rotate(111.844 242.284 173.445)"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
        <rect
          x="90.0546"
          y="242.783"
          width="5.5"
          height="236.5"
          transform="rotate(-158.156 90.0546 242.783)"
          fill="black"
          stroke="black"
          stroke-width="5.5"
        ></rect>
      </svg> */}
    </footer>
  );
};
export default Footer;
