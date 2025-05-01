import React, { useState, useEffect } from "react";
import { motion, useViewportScroll } from "framer-motion";
import { Container } from "react-bootstrap";
import SocialMedia from "../Global/SocialMedia";
import { Link } from "react-router-dom";
import LogoutButton from "../CMS/LogoutButton";
const logoDark = "/assets/logo/sid-logo-light-vone.svg";

const AdminHeader = () => {
  const { scrollY } = useViewportScroll();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange(() => {
      if (scrollY.current > 100 && scrollY.current > scrollY.prev) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    });
    return unsubscribe;
  }, [scrollY]);

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
          <div className="sid-navbar__logo position-relative py-4">
            <img src={logoDark} alt="logo" className="img-fluid" />
            <Link
              to="/"
              className="position-absolute top-0 start-0 end-0 bottom-0"
            >
              {" "}
            </Link>
          </div>
          <div className="d-flex align-items-center">
            
            <LogoutButton/>
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};

export default AdminHeader;
