import { Container, Row, Col } from "react-bootstrap";
import React from "react";
const logoLight = "./assets/logo/logo-light.webp";

const dataSocial = [
  { name: "Behance", link: "#", icon: "./assets/logo/behance-icon.svg" },
  { name: "Dribble", link: "#", icon: "./assets/logo/dribble-icon.svg" },
  { name: "Instagram", link: "#", icon: "./assets/logo/instagram-icon.svg" },
];
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
          <Row className="g-4">
            <Col md={6} lg={4}>
              <img src={logoLight} alt="" className="img-fluid w-75 mb-5" />
              <p className="text-uppercase color-white font-bold text-md text-lg-xl customFontOneBold w-75">
                DIRECTRICE ARTISTIQUE — UI/UX DESIGNER — GRAPHIC DESIGNER EN
                FREELANCE - BASÉE EN FRANCE
              </p>
            </Col>
            <Col md={6} lg={4}>
              <p className="color-white font-bold text-3xl text-lg-5xl customFontOneBold w-75 mb-10">
                Un projet en tête ? N'hésitez pas à me contacter !
              </p>
              <button className="sid-button__neon customFontOneBold font-bold mt-3">
                Contactez-moi par mail
              </button>
            </Col>
            <Col md={6} lg={4}>
              <p className="color-white font-thin text-md text-md-2xl text-lg-4xl customFontOneRegular">
                REJOIGNEZ-MOI SUR LES RÉSEAUX SOCIAUX !
              </p>
              <ul className="d-flex mt-6">
                {dataSocial.map((data, index) => {
                  return (
                    <li key={index} className="me-5">
                      <a href={data.link}>
                        <img
                          src={data.icon}
                          alt={data.name}
                          className="img-fluid"
                          style={{ height: "40px", width: "40px" }}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
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
