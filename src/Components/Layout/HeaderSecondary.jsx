import React from "react";
import { motion, useViewportScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SocialMedia from "../Global/SocialMedia";
import { Link } from "react-router-dom";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
const logoDark = "/assets/logo/sid-logo-dark-vone.svg";
const HeaderSecondary = () => {
//  start
const [resumeUrl, setResumeUrl] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchResume = async () => {
    try {
      const storage = getStorage();
      const resumesRef = ref(storage, "resumes/");
      const list = await listAll(resumesRef);

      if (list.items.length > 0) {
        const filesWithMetadata = await Promise.all(
          list.items.map(async (item) => {
            const metadata = await getMetadata(item);
            return { item, metadata };
          })
        );

        filesWithMetadata.sort(
          (a, b) => new Date(b.metadata.timeCreated) - new Date(a.metadata.timeCreated)
        );

        const latestFile = filesWithMetadata[0].item;
        const url = await getDownloadURL(latestFile);
        setResumeUrl(url);
      } else {
        console.log("No files found in Firebase Storage.");
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchResume();
}, []);
// end

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
      className="position-sticky w-100 top-0 sid-navbar sid-navbar--glassmorphism"
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="sid-navbar__logo position-relative py-4">
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
          <div className="d-flex align-items-center">
            <SocialMedia iconSize="text-4xl text-dark" />
            {/* <a href="/assets/docs/siddhi-parkar-resume.pdf" target="_blank" className="d-inline-block bg-transparent sid-button__login color-white text-md px-8">Resume</a>
             */}
             {loading ? (
              <span>Loading...</span>
            ) : resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="d-none d-lg-block bg-transparent sid-button__login color-white text-md px-8"
              >
                Resume
              </a>
            ) : (
              <span className="d-none d-lg-block bg-transparent sid-button__login color-white text-md px-8">
                No Resume Available
              </span>
            )}
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};
export default HeaderSecondary;
