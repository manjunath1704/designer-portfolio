import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import PopUp from "../Global/PopUp";
import SocialMedia from "../Global/SocialMedia";
const logoDark = "./assets/logo/logo-dark.webp";
const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <nav className="position-fixed w-100 top-0 sid-navbar">
      <Container>
        <div className="d-flex justify-content-between align-items-center py-5">
          <SocialMedia/>
        </div>
        {/* <button onClick={openPopup}>Open Popup</button>
        <PopUp isOpen={isPopupOpen} onClose={closePopup}>
          <h5 className="text-4xl font-bold color-white">
            {" "}
            Log in to continue
          </h5>
        </PopUp> */}
      </Container>
    </nav>
  );
};
export default Header;
