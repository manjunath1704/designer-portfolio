import React, { useState, useEffect } from "react";
import { motion, useViewportScroll } from "framer-motion";
import { Container } from "react-bootstrap";
import SocialMedia from "../Global/SocialMedia";
import { Link ,useLocation} from "react-router-dom";
import LogoutButton from "../CMS/LogoutButton";
import { Download, FileEarmarkText, FileEarmarkTextFill, Window } from "react-bootstrap-icons";
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

  const { pathname } = useLocation();
  const isProjectActive =
  pathname === "/admin/create-project" || pathname === "/admin/projects";
const isResumeActive = pathname === "/admin/manage-resume";
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
          <div className="d-flex align-items-center gap-4">
             <Link to="/admin/projects" className={`bg-transparent sid-button__login color-white text-md px-5 px-md-12 ${
          isProjectActive ? "glitter-button" : ""
        }`}> <span className="d-none d-md-block">Projects</span> <Window className="text-2xl d-block d-md-none" /></Link>
             <Link to="/admin/manage-resume" className={`bg-transparent sid-button__login color-white text-md px-5 px-md-12 ${
          isResumeActive ? "glitter-button" : ""
        }`}> <span className="d-none d-md-block">Resumes</span><FileEarmarkText className="text-2xl d-block d-md-none" /> </Link>
            <LogoutButton/>
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};

export default AdminHeader;
