import React from "react";
import { motion, useViewportScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
// import PopUp from "../Global/PopUp";
import SocialMedia from "../Global/SocialMedia";
import { Link } from "react-router-dom";
const logoDark = "/assets/logo/sid-logo-blue.svg";


const Header = () => {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const openPopup = () => {
  //   setIsPopupOpen(true);
  // };

  // const closePopup = () => {
  //   setIsPopupOpen(false);
  // };

  // Navbar Animation
  const { scrollY } = useViewportScroll();
  const [hidden, setHidden] = useState(false);
  // this onUpdate function will be called in the `scrollY.onChange` callback
  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  // update the onChange callback to call for `update()`
  useEffect(() => {
    return scrollY.onChange(() => update());
  });

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -80 },
  };

  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.7 }}
      className="position-fixed w-100 top-0 sid-navbar sid-navbar--dark"
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="sid-navbar__logo position-relative py-2">
            <img src={logoDark} alt="logo" className="img-fluid" />
            <Link
              to="/"
              className="position-absolute top-0 start-0 end-0 bottom-0"
            >
              {" "}
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <SocialMedia iconSize="text-4xl" />
            <a href="/assets/docs/siddhi-parkar-resume.pdf" target="_blank" className="d-inline-block d-none d-lg-block bg-transparent sid-button__login color-white text-md px-8">Resume</a>
            
          </div>
        </div>

        {/* <button onClick={openPopup}>Open Popup</button> */}
        {/* <PopUp isOpen={isPopupOpen} onClose={closePopup}>
          <h5 className="text-4xl font-bold color-white">
            {" "}
            Log in to continue
          </h5>
        </PopUp> */}
      </Container>
    </motion.nav>
  );
};
export default Header;
