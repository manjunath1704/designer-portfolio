import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AnimatingElement from "../Global/AppearingAnimation";
import { motion, AnimatePresence } from "framer-motion";
const Hero = () => {
  const [showHand, setShowHand] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHand(false);
    }, 3200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <section className="overflow-hidden sid-hero d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col xs={12} className="text-center color-white">
            <AnimatingElement>
              <h6 className="sid-font__body text-2xl text-lg-4xl font-regular">
                Hello there, I am
              </h6>
              <h4 className="sid-font__head text-5xl text-lg-9xl font-light my-4 text-uppercase">
                Siddhi Parkar
              </h4>
              <p className="sid-font__body text-2xl text-lg-4xl font-semibold">
                UI UX Designer
              </p>
              {/* <p className='sid-font__body text-xl text-lg-3xl font-regular opacity-50 mt-4'>Freelancer based in Mumbai, India</p> */}
            </AnimatingElement>
          </Col>
        </Row>
        <AnimatePresence>
          {showHand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img
                src="/assets/waving-hand.gif"
                className="sid-hero__video"
                alt=""
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};
export default Hero;