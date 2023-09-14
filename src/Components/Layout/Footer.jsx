import React from "react";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import SocialMedia from "../Global/SocialMedia";
import { Link } from "react-router-dom";
const logoDark = "./assets/logo/sid-logo-blue.svg";

const Footer = () => {
  const footerTop = useRef(null);
  const footerBottom = useRef(null);
  const isInViewFooterTop = useInView(footerTop, { once: true });
  const isInViewFooterBottom = useInView(footerBottom, { once: true });
  return (
    <footer className="sid-footer">
      <div className="sid-footer__top" ref={footerTop}>
        <Container>
          <Row>
            <Col xs={12}>
              <motion.div
                style={{
                  transform: isInViewFooterTop ? "none" : "translateX(-200px)",
                  opacity: isInViewFooterTop ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
              >
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
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sid-footer__bottom" ref={footerBottom}>
        <Container>
          <Row className=" justify-content-center text-center">
            <Col>
              <motion.div
                style={{
                  transform: isInViewFooterBottom
                    ? "none"
                    : "translateY(200px)",
                  opacity: isInViewFooterBottom ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
                className="d-flex justify-content-center align-items-center flex-column"
              >
                <div className="sid-footer__logo position-relative">
                  <img
                    src={logoDark}
                    alt="logo"
                    className="img-fluid"
                  />
                  <Link
                    to="/"
                    className="position-absolute top-0 start-0 end-0 bottom-0"
                  >
                    {" "}
                  </Link>
                </div>
                <h4 className="sid-font__head text-uppercase text-2xl text-lg-4xl font-light color-white  my-lg-4">
                  Siddhi Parkar
                </h4>
                <SocialMedia iconSize="text-4xl text-lg-8xl" />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
